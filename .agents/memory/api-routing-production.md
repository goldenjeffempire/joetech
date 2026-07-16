---
name: API routing in production
description: How serveStaticFiles and serveSPAFallback are split to prevent the SPA wildcard from shadowing /api/* routes in production.
---

## Rule
`server/static.ts` exports two functions that must be called in strict order:
1. `serveStaticFiles(app)` — called **synchronously before** `httpServer.listen()` so hashed assets (JS/CSS/images) are served with zero startup gap.
2. `serveSPAFallback(app)` — called **in the async block, AFTER** `registerRoutes()` so Express sees API routes before the `/{*path}` wildcard.

## Why
Express matches middleware in registration order. A `/{*path}` wildcard registered before API routes swallows all `/api/*` requests and returns `index.html` instead of JSON — forms silently break in production while dev mode works fine (Vite handles everything, no SPA fallback involved).

The `__dirname` usage inside these functions is lazy (inside the function body, not at module scope) so `tsx` dev mode (ESM, no `__dirname`) never triggers a ReferenceError — the functions are only called when `isProduction` is true.

## How to apply
Any time static serving is touched: keep `serveStaticFiles` before `listen`, keep `serveSPAFallback` after `registerRoutes` in the async block. Never merge them back into a single `serveStatic` function call at module-load time.
