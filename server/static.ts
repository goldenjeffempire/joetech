import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  // __dirname in the esbuild CJS bundle points to the dist/ directory.
  // Check multiple candidate paths in priority order for maximum portability
  // across Render native, Docker, Railway, Fly.io, and local production runs.
  const candidates = [
    path.resolve(__dirname, "public"),              // dist/public (CJS bundle __dirname = dist/)
    path.resolve(process.cwd(), "dist", "public"),  // <cwd>/dist/public
    path.resolve(process.cwd(), "public"),          // <cwd>/public (some platforms)
  ];

  console.log("[static] searching for build directory...");
  candidates.forEach((c, i) => {
    const exists = fs.existsSync(c);
    console.log(`[static]   [${i}] ${c} — ${exists ? "FOUND ✓" : "not found"}`);
  });

  const distPath = candidates.find(fs.existsSync);

  if (!distPath) {
    // Do NOT throw here — a thrown error in serveStatic propagates to the
    // startup IIFE's catch block, which still calls markReady() via finally.
    // However, the SPA fallback below won't work, so serve a diagnostic page.
    console.error(
      `[static] FATAL: Could not find build directory. Tried:\n` +
      candidates.map((c) => `  - ${c}`).join("\n") + "\n" +
      `  Make sure 'npm run build' ran before starting the server.\n` +
      `  process.cwd() = ${process.cwd()}\n` +
      `  __dirname     = ${__dirname}`
    );

    // Serve a branded diagnostic page on all routes so the user sees something
    // meaningful instead of a blank screen.
    app.use("/{*path}", (_req, res) => {
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

  console.log(`[static] serving from ${distPath}`);

  // Verify index.html exists before we start serving
  const indexPath = path.resolve(distPath, "index.html");
  if (!fs.existsSync(indexPath)) {
    console.error(`[static] WARNING: index.html not found at ${indexPath}`);
  } else {
    console.log(`[static] index.html confirmed at ${indexPath}`);
  }

  // Serve hashed assets (JS, CSS, images) with long-term immutable cache.
  // HTML files are intentionally excluded — they must never be cached so that
  // each new deployment delivers fresh HTML pointing to the correct asset hashes.
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

  // SPA fallback — always return index.html for unknown paths so client-side
  // routing works. Also served with no-cache so updates are instant.
  app.use("/{*path}", (_req, res) => {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.sendFile(indexPath);
  });
}
