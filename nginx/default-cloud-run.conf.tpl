# Placeholder __PORT__ is replaced at container start (Cloud Run sets PORT).
server {
    listen       0.0.0.0:__PORT__;
    server_name  localhost;
    root   /usr/share/nginx/html;
    index  index.html;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript application/xml image/svg+xml;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /assets/ {
        add_header Cache-Control "public, max-age=31536000, immutable";
        try_files $uri =404;
    }
}
