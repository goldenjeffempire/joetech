import express, { type Request, Response, NextFunction } from "express";
import helmet from "helmet";
import compression from "compression";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);
const isProduction = process.env.NODE_ENV === "production";

app.set("trust proxy", 1);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
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

// Instant ping/warmup endpoint — always responds immediately, even before full
// setup is complete, so Render health checks and keep-alive pings never block.
app.get("/ping", (_req, res) => {
  res.status(200).send("ok");
});

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

// ── Async setup ──────────────────────────────────────────────────────────────
// markReady() MUST be called no matter what — if it is never called, all
// incoming requests queue forever and the site shows a blank page.
// The try/finally guarantees this even when the DB is unreachable.
(async () => {
  try {
    const { runMigrations } = await import("./db");
    await runMigrations();

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

    if (isProduction) {
      const { serveStatic } = await import("./static");
      serveStatic(app);
    } else {
      const { setupVite } = await import("./vite");
      await setupVite(httpServer, app);
    }

    log("setup complete — serving requests", "express");
  } catch (err) {
    console.error("[startup] Fatal setup error:", err);
    console.error("[startup] Server will still serve requests but may be degraded.");
  } finally {
    // Always release the readiness gate so the site is never permanently blank.
    markReady();
  }
})();
