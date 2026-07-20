import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { getRouteMeta, injectSSRMeta } from "./seo-meta";

// Resolve the dist/public directory from a given __dirname-equivalent.
// __dirname in the esbuild CJS bundle points to the dist/ directory.
// Multiple candidate paths are checked for maximum portability across
// Render, Railway, Fly.io, local production runs, etc.
//
// IMPORTANT: this function is intentionally called lazily (inside the
// exported functions below) and NOT at module scope. In dev mode, tsx
// runs under Node ESM where __dirname is not defined; the exported
// functions are only invoked when isProduction is true, so the lazy
// call never runs in dev and the ReferenceError is avoided.
function resolveDistPath(): { distPath: string | null; indexPath: string | null } {
  const candidates = [
    path.resolve(__dirname, "public"),             // dist/public (CJS bundle __dirname = dist/)
    path.resolve(process.cwd(), "dist", "public"), // <cwd>/dist/public
    path.resolve(process.cwd(), "public"),         // <cwd>/public (some platforms)
  ];

  console.log("[static] searching for build directory...");
  candidates.forEach((c, i) => {
    const exists = fs.existsSync(c);
    console.log(`[static]   [${i}] ${c} — ${exists ? "FOUND ✓" : "not found"}`);
  });

  const distPath = candidates.find(fs.existsSync) ?? null;

  if (!distPath) {
    console.error(
      `[static] FATAL: Could not find build directory. Tried:\n` +
      candidates.map((c) => `  - ${c}`).join("\n") + "\n" +
      `  Make sure 'npm run build' ran before starting the server.\n` +
      `  process.cwd() = ${process.cwd()}\n` +
      `  __dirname     = ${__dirname}`
    );
    return { distPath: null, indexPath: null };
  }

  console.log(`[static] serving from ${distPath}`);

  const indexPath = path.resolve(distPath, "index.html");
  if (!fs.existsSync(indexPath)) {
    console.error(`[static] WARNING: index.html not found at ${indexPath}`);
  } else {
    console.log(`[static] index.html confirmed at ${indexPath}`);
  }

  return { distPath, indexPath };
}

// Cached result — both functions share the same path resolution so we only
// scan the filesystem once even when both are called.
let _resolved: { distPath: string | null; indexPath: string | null } | null = null;
function getResolved() {
  if (!_resolved) _resolved = resolveDistPath();
  return _resolved;
}

/**
 * Step 1 — Register express.static ONLY.
 * Call this synchronously before httpServer.listen() so every static-file
 * request (JS chunks, CSS, images, favicons) is handled immediately on
 * first boot with no async gap.
 *
 * The SPA fallback wildcard is intentionally NOT registered here — it must
 * come AFTER API routes in the middleware chain (see serveSPAFallback below).
 */
export function serveStaticFiles(app: Express): void {
  const { distPath } = getResolved();

  if (!distPath) {
    // Serve a branded 503 diagnostic page on all routes so the user sees
    // something meaningful instead of a blank screen.
    app.use((_req, res) => {
      res.status(503).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>JOE Technologies — Build Not Found</title>
          <style>
            body { margin:0; background:#060A10; color:#fff; font-family:monospace;
                   display:flex; align-items:center; justify-content:center;
                   min-height:100vh; text-align:center; flex-direction:column; gap:12px; }
            h1 { color:#48F2FB; font-size:1.25rem; }
            p { color:rgba(255,255,255,0.5); max-width:480px; font-size:0.85rem; line-height:1.6; }
            code { background:#1a2232; padding:2px 6px; border-radius:4px; color:#E867EA; }
          </style>
        </head>
        <body>
          <h1>&lt;JOE/&gt; — Service Starting</h1>
          <p>The production build artifacts could not be located.<br>
          Run <code>npm run build</code> before starting the server,<br>
          or wait for the deployment pipeline to complete.</p>
        </body>
        </html>
      `);
    });
    return;
  }

  // Serve hashed assets (JS, CSS, images) with long-term immutable cache.
  // HTML files are excluded — they must never be cached so each new
  // deployment delivers fresh HTML pointing to the correct asset hashes.
  app.use(express.static(distPath, {
    setHeaders(res, filePath) {
      if (filePath.endsWith(".html")) {
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Expires", "0");
      } else {
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      }
    },
    etag: true,
  }));
}

/**
 * Step 2 — Register the SPA fallback wildcard.
 * Call this AFTER registerRoutes() in the async startup block so that API
 * routes (/api/*) are earlier in the Express middleware chain than this
 * wildcard. Express matches handlers in registration order — registering
 * this wildcard before the API routes would swallow every /api/* request
 * and return index.html instead of JSON.
 *
 * SSR META INJECTION
 * ──────────────────
 * Before sending index.html, this handler replaces the title, description,
 * keywords, canonical, and OG/Twitter tags with route-specific values from
 * seo-meta.ts. This ensures social crawlers (LinkedIn, WhatsApp, Facebook,
 * Slack) and Googlebot see correct metadata in the raw HTML before any
 * JavaScript runs. Results are cached per-route — the regex replacement
 * only runs once per unique path for the lifetime of the process.
 */

// Base HTML read once on first request, then cached. Never mutated directly.
let _baseHtml: string | null = null;
// Per-route injected HTML cache. Populated lazily.
const _routeHtmlCache = new Map<string, string>();

function getBaseHtml(indexPath: string): string {
  if (_baseHtml === null) {
    _baseHtml = fs.readFileSync(indexPath, "utf-8");
  }
  return _baseHtml;
}

export function serveSPAFallback(app: Express): void {
  const { distPath, indexPath } = getResolved();
  if (!distPath || !indexPath) return;

  app.use("/{*path}", (req, res) => {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("Content-Type", "text/html; charset=utf-8");

    // req.path in app.use("/{*path}") strips the leading slash in Express 5,
    // so "/about" becomes "about". Use req.originalUrl (always the full path)
    // and strip any query string. Fall back to "/" if somehow missing.
    const rawPath = (req.originalUrl ?? req.path ?? "/").split("?")[0];
    const pathname = rawPath.startsWith("/") ? rawPath : `/${rawPath}`;

    if (!_routeHtmlCache.has(pathname)) {
      const base = getBaseHtml(indexPath);
      const meta = getRouteMeta(pathname);
      const injected = injectSSRMeta(base, meta);
      _routeHtmlCache.set(pathname, injected);
    }

    res.send(_routeHtmlCache.get(pathname));
  });
}
