FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

FROM base AS builder
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=builder /app/dist ./dist

EXPOSE 5000

CMD ["node", "dist/index.cjs"]
