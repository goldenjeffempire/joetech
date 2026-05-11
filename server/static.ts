import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  // __dirname in the esbuild CJS bundle points to the dist/ directory.
  // As a belt-and-suspenders fallback, also check relative to process.cwd().
  const candidates = [
    path.resolve(__dirname, "public"),
    path.resolve(process.cwd(), "dist", "public"),
    path.resolve(process.cwd(), "public"),
  ];
  const distPath = candidates.find(fs.existsSync);

  if (!distPath) {
    throw new Error(
      `Could not find the build directory. Tried: ${candidates.join(", ")}. ` +
      `Make sure to run the build step before starting the server.`,
    );
  }

  console.log(`[static] serving from ${distPath}`);

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
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
