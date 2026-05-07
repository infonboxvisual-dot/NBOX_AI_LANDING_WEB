# syntax=docker/dockerfile:1

FROM node:20-alpine AS builder
WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

FROM node:20-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

# Install production deps (includes vite for `npm run preview`)
COPY package*.json ./
RUN npm ci --omit=dev

# Copy build output
COPY --from=builder /app/dist ./dist

EXPOSE 8080

# Cloud Run health check
HEALTHCHECK --interval=10s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "require('http').get('http://127.0.0.1:' + (process.env.PORT || 8080) + '/', (r) => { if (r.statusCode >= 400) process.exit(1); r.resume(); }).on('error', () => process.exit(1));"

# Cloud Run contract: listen on 0.0.0.0 and port from process.env.PORT
CMD ["sh", "-c", "npm run preview -- --host 0.0.0.0 --port ${PORT:-8080}"]

