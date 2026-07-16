import express, { type Request, Response, NextFunction } from "express";
import helmet from "helmet";
import { createServer } from "http";
import { serveStaticFiles, serveSPAFallback } from "./static";

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

// NOTE: compression middleware intentionally removed.
// Render uses Cloudflare CDN which handles Brotli/gzip automatically.
// Running server-side compression alongside Cloudflare caused a
// content-length: 1 bug — the browser received truncated JS bundles,
// silently failing to load the app. Let Cloudflare own compression.

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

// ── Static files (production) — synchronous, zero delay ─────────────────────
// serveStaticFiles registers express.static only (no SPA wildcard) so that
// hashed JS/CSS assets are available from the very first request with no
// async gap. The SPA fallback wildcard is registered AFTER API routes in
// the async block below to prevent it from swallowing /api/* requests.
if (isProduction) {
  serveStaticFiles(app);
  log("static files ready", "express");
}

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

// ── Async setup: dev Vite + DB migrations + API routes ───────────────────────
// Static files are already served synchronously above (production).
// This async block handles dev Vite middleware, DB, and API routes.
// None of this blocks the frontend from loading.
(async () => {
  // ── Dev only: Vite middleware (must be async) ────────────────────────────
  if (!isProduction) {
    try {
      const { setupVite } = await import("./vite");
      await setupVite(httpServer, app);
      log("vite dev middleware ready", "express");
    } catch (err) {
      console.error("[startup] Vite setup error:", err);
    }
  }

  // ── DB migrations (best-effort) ──────────────────────────────────────────
  try {
    const { runMigrations } = await import("./db");
    await runMigrations();
  } catch (err) {
    console.error("[startup] DB migration error (non-fatal):", err);
  }

  // ── API routes (best-effort) ─────────────────────────────────────────────
  try {
    const { registerRoutes } = await import("./routes");
    await registerRoutes(httpServer, app);

    app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = isProduction && status === 500
        ? "Internal Server Error"
        : err.message || "Internal Server Error";
      console.error("Internal Server Error:", err);
      if (res.headersSent) return next(err);
      return res.status(status).json({ message });
    });

    log("setup complete", "express");
  } catch (err) {
    console.error("[startup] Route registration error (non-fatal):", err);
  }

  // ── SPA fallback (production, registered LAST) ────────────────────────────
  // Must come after API routes so the wildcard does not shadow /api/* paths.
  // Express matches middleware in registration order; placing this before
  // registerRoutes would return index.html for every API call.
  if (isProduction) {
    const { serveSPAFallback } = await import("./static");
    serveSPAFallback(app);
    log("SPA fallback registered", "express");
  }
})();
