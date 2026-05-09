#!/bin/sh
set -eu
PORT="${PORT:-8080}"

sed "s/__PORT__/${PORT}/g" /etc/nginx/default-cloud-run.conf.tpl >/etc/nginx/conf.d/default.conf
nginx -t
exec nginx -g "daemon off;"
