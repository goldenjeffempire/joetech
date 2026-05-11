FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

# ── Builder stage ─────────────────────────────────────────────────────────────
# Install ALL deps (including devDeps) so the build tools are available.
FROM base AS builder
RUN npm ci
COPY . .
RUN npm run build

# ── Production stage ──────────────────────────────────────────────────────────
# The esbuild CJS bundle (dist/index.cjs) is fully self-contained: all server
# runtime deps (helmet, compression, express, pg, drizzle-orm, zod, etc.) are
# bundled in. Only Node built-ins and truly optional native addons are external.
#
# We still run `npm ci --omit=dev` to provide node_modules for any residual
# require() calls (e.g. pg-native optional probe, supports-color), but the
# critical server packages are already inside the bundle.
FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy the complete built output from the builder:
#   dist/index.cjs  — fully bundled server binary
#   dist/public/    — Vite-built client assets (HTML + hashed JS/CSS chunks)
COPY --from=builder /app/dist ./dist

# Render and most platforms set PORT dynamically; the server uses process.env.PORT.
# EXPOSE is documentation only and does not bind the port.
EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD wget -qO- http://localhost:${PORT:-5000}/ping || exit 1

CMD ["node", "dist/index.cjs"]
