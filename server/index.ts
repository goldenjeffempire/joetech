import express, { type Request, Response, NextFunction } from "express";
import helmet from "helmet";
import compression from "compression";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);
const isProduction = process.env.NODE_ENV === "production";

// ── Startup diagnostics ───────────────────────────────────────────────────────
// Logged on every cold start so Render / Docker logs show exactly what the
// server sees. Helps diagnose blank-page issues caused by wrong PORT, missing
// DATABASE_URL, or incorrect static-file paths without needing remote access.
console.log("[startup] ═══════════════════════════════════════════════════");
console.log(`[startup] NODE_ENV      = ${process.env.NODE_ENV ?? "(not set)"}`);
console.log(`[startup] PORT          = ${process.env.PORT ?? "(not set, will use 5000)"}`);
console.log(`[startup] DATABASE_URL  = ${process.env.DATABASE_URL ? "set ✓" : "NOT SET ✗"}`);
console.log(`[startup] ADMIN_SECRET  = ${process.env.ADMIN_SECRET ? "set ✓" : "(not set)"}`);
console.log(`[startup] process.cwd() = ${process.cwd()}`);
console.log(`[startup] Node version  = ${process.version}`);
console.log("[startup] ═══════════════════════════════════════════════════");
// ─────────────────────────────────────────────────────────────────────────────

app.set("trust proxy", 1);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
  // Disable CORP header — leaving it as "same-origin" blocks Render's HTTPS
  // proxy from serving ES module chunks that have the `crossorigin` attribute
  // on <link rel="modulepreload"> tags, causing the JS bundle to fail silently
  // and the loading screen to persist indefinitely in production.
  crossOriginResourcePolicy: false,
}));

app.use(compression());

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
    limit: "1mb",
  }),
);

app.use(express.urlencoded({ extended: false, limit: "1mb" }));

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      log(logLine);
    }
  });

  next();
});

// Instant ping/warmup endpoints — always respond immediately, even before
// full setup is complete, so Render/Replit health checks never time out.
app.get("/ping", (_req, res) => res.status(200).send("ok"));
app.get("/api/health", (_req, res) =>
  res.json({ status: "ok", timestamp: new Date().toISOString() })
);

// ── Readiness gate ──────────────────────────────────────────────────────────
// The server starts listening before async setup (routes + Vite) completes so
// the OS socket is open as fast as possible. Any request that arrives before
// setup is done is held here and released the moment setup finishes.
let _setupComplete = false;
const _waitQueue: Array<() => void> = [];

function markReady() {
  _setupComplete = true;
  _waitQueue.splice(0).forEach((fn) => fn());
}

// Queue all non-essential requests until setup is complete.
// Without this middleware, requests arriving during startup (runMigrations +
// registerRoutes + Vite setup) would fall through with no matching route and
// return a 404 or hang — causing a blank page on first load.
// /ping and /api/health are always exempt so Render/Replit health checks
// never time out during the startup window.
const ALWAYS_READY = new Set(["/ping", "/api/health"]);
app.use((req, _res, next) => {
  if (_setupComplete || ALWAYS_READY.has(req.path)) return next();
  _waitQueue.push(next);
});
// ────────────────────────────────────────────────────────────────────────────

// ALWAYS serve the app on the port specified in the environment variable PORT.
// Other ports are firewalled. Default to 5000 if not specified.
const port = parseInt(process.env.PORT || "5000", 10);
httpServer.listen(
  {
    port,
    host: "0.0.0.0",
    reusePort: true,
  },
  () => {
    log(`serving on port ${port}`);
  },
);

// Self-ping keep-alive — production only.
if (isProduction) {
  const PING_INTERVAL_MS = 4 * 60 * 1000;
  const selfUrl = process.env.RENDER_EXTERNAL_URL
    ? `${process.env.RENDER_EXTERNAL_URL}/ping`
    : `http://localhost:${port}/ping`;

  setInterval(async () => {
    try {
      const res = await fetch(selfUrl, { signal: AbortSignal.timeout(10_000) });
      log(`keep-alive ping → ${res.status}`, "keepalive");
    } catch (err) {
      log(`keep-alive ping failed: ${(err as Error).message}`, "keepalive");
    }
  }, PING_INTERVAL_MS);

  log(`keep-alive enabled → pinging ${selfUrl} every 4 min`, "keepalive");
}

// ── Graceful shutdown ─────────────────────────────────────────────────────────
// Render sends SIGTERM to the old instance during a rolling deploy. Without a
// proper shutdown handler, in-flight requests receive a TCP RST (connection
// reset) — the browser shows a network error mid-load. This handler:
//   1. Stops the HTTP server accepting new connections immediately.
//   2. Waits up to DRAIN_TIMEOUT_MS for in-flight requests to finish.
//   3. Force-closes any lingering keep-alive connections.
//   4. Drains and closes the PostgreSQL pool.
//   5. Exits with code 0 so Render marks the old instance as cleanly stopped.
const DRAIN_TIMEOUT_MS = 15_000;
let _isShuttingDown = false;

async function gracefulShutdown(signal: string): Promise<void> {
  if (_isShuttingDown) return;
  _isShuttingDown = true;

  log(`${signal} received — draining in-flight requests (${DRAIN_TIMEOUT_MS / 1000}s max)`, "shutdown");

  // 1 + 3. Stop accepting new connections; force-close keep-alive connections
  // that haven't finished within the drain window.
  const drainTimer = setTimeout(() => {
    log("drain timeout — force-closing idle keep-alive connections", "shutdown");
    httpServer.closeAllConnections?.();
  }, DRAIN_TIMEOUT_MS);
  drainTimer.unref();

  await new Promise<void>((resolve) => {
    httpServer.close((err) => {
      if (err) log(`HTTP close error: ${err.message}`, "shutdown");
      clearTimeout(drainTimer);
      resolve();
    });
  });

  log("HTTP server closed — all requests drained", "shutdown");

  // 4. Return DB connections to the pool and close it cleanly.
  try {
    const { pool } = await import("./db");
    await pool.end();
    log("DB pool closed", "shutdown");
  } catch (err) {
    log(`DB pool close error: ${(err as Error).message}`, "shutdown");
  }

  log("shutdown complete", "shutdown");
  process.exit(0);
}

// Register once so SIGTERM (Render rolling deploy) and SIGINT (Ctrl-C) both
// trigger the same clean shutdown path.
process.once("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.once("SIGINT",  () => gracefulShutdown("SIGINT"));

// ── Global error guards ───────────────────────────────────────────────────────
// Without these, a single unhandled promise rejection silently crashes the
// process on Node 18+, taking the entire service down with no log.
process.on("unhandledRejection", (reason: unknown) => {
  console.error("[server] Unhandled Promise Rejection:", reason);
  // Do NOT exit — the rejection is almost always from a request handler,
  // not a fatal process-level failure.
});

process.on("uncaughtException", (err: Error) => {
  // An uncaught synchronous exception is genuinely fatal — the process is
  // in an unknown state. Log it and let the process manager restart us.
  console.error("[server] Uncaught Exception (fatal):", err);
  process.exit(1);
});
// ─────────────────────────────────────────────────────────────────────────────

// ── Async setup ──────────────────────────────────────────────────────────────
// ORDER MATTERS:
//   1. Static files / Vite first → markReady() immediately so the frontend
//      loads without waiting for the database.  A slow or unreachable DB must
//      NEVER block the browser from receiving the JS bundle.
//   2. DB migrations (best-effort, non-blocking).
//   3. API routes (best-effort, non-blocking).
//
// markReady() is called in the finally of Step 1 so the readiness gate is
// released as soon as the frontend can be served, regardless of DB health.
(async () => {
  // ── Step 1: Static files / Vite — runs FIRST so the frontend is never ────
  // blocked by a slow database.  The readiness gate is released here.
  try {
    if (isProduction) {
      const { serveStatic } = await import("./static");
      serveStatic(app);
    } else {
      const { setupVite } = await import("./vite");
      await setupVite(httpServer, app);
    }
    log("static/vite ready — serving frontend", "express");
  } catch (err) {
    console.error("[startup] Static/Vite setup error:", err);
  } finally {
    // Release the readiness gate as soon as the frontend can be served.
    // API routes register below; they may not be ready yet for a few hundred
    // milliseconds, but that is fine — the browser is fetching JS, not APIs.
    markReady();
  }

  // ── Step 2: DB migrations (best-effort) ─────────────────────────────────
  try {
    const { runMigrations } = await import("./db");
    await runMigrations();
  } catch (err) {
    console.error("[startup] DB migration error (non-fatal):", err);
  }

  // ── Step 3: API routes (best-effort) ────────────────────────────────────
  try {
    const { registerRoutes } = await import("./routes");
    await registerRoutes(httpServer, app);

    app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = isProduction && status === 500
        ? "Internal Server Error"
        : err.message || "Internal Server Error";

      console.error("Internal Server Error:", err);

      if (res.headersSent) {
        return next(err);
      }

      return res.status(status).json({ message });
    });

    log("api routes ready — setup complete", "express");
  } catch (err) {
    console.error("[startup] Route registration error (non-fatal):", err);
  }
})();
