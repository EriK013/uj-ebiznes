#!/bin/sh
: "${API_URL:=http://localhost:8080}"
echo "window.__API_URL__ = \"${API_URL}\";" > /usr/share/nginx/html/env.js
