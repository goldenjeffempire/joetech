import express, { type Request, Response, NextFunction } from "express";
import helmet from "helmet";
import compression from "compression";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);
const isProduction = process.env.NODE_ENV === "production";

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

// Instant ping/warmup endpoint — always responds in <1ms, prevents cold-start
// screen on Render by giving the load balancer a fast health check target.
app.get("/ping", (_req, res) => {
  res.status(200).send("ok");
});

// ALWAYS serve the app on the port specified in the environment variable PORT.
// Other ports are firewalled. Default to 5000 if not specified.
// Start listening FIRST so Render/the host sees a live server immediately,
// then finish the async route/Vite setup in the background.
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

// Finish setup asynchronously — routes and Vite middleware are registered
// after the server is already accepting connections, so no request ever
// arrives before there is something listening on the socket.
(async () => {
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
})();
