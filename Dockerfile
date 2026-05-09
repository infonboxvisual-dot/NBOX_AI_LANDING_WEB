# syntax=docker/dockerfile:1

FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Static hosting on nginx (avoid Vite preview + Cloud Run HOST checks)
FROM nginx:1.27-alpine AS runtime

ENV PORT=8080

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx/default-cloud-run.conf.tpl /etc/nginx/default-cloud-run.conf.tpl
COPY nginx/docker-entrypoint-cloudrun.sh /docker-entrypoint-cloudrun.sh
RUN chmod +x /docker-entrypoint-cloudrun.sh

EXPOSE 8080

# Cloud Run probes reach the same PORT the app binds to (no IPv6 [::] bind)
HEALTHCHECK --interval=10s --timeout=5s --start-period=5s --retries=3 \
  CMD sh -c 'wget -q -O /dev/null "http://127.0.0.1:${PORT:-8080}/" || exit 1'

ENTRYPOINT ["/docker-entrypoint-cloudrun.sh"]
