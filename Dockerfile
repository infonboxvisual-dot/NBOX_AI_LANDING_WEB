# syntax=docker/dockerfile:1

FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production static hosting — avoids Vite preview "allowedHosts" and is lighter
FROM nginx:1.27-alpine AS runtime

ENV PORT=8080

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx/templates/default.conf.template /etc/nginx/templates/default.conf.template

EXPOSE 8080

HEALTHCHECK --interval=10s --timeout=5s --start-period=5s --retries=3 \
  CMD sh -c 'wget -q -O /dev/null "http://127.0.0.1:${PORT:-8080}/" || exit 1'

# Official nginx entrypoint substitutes templates then runs nginx
CMD ["nginx", "-g", "daemon off;"]
