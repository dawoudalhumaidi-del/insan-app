#!/bin/bash
cd "$(dirname "$0")"
PORT=8765

# If port in use, pick another
while lsof -i :$PORT >/dev/null 2>&1; do
  PORT=$((PORT+1))
done

URL="http://localhost:${PORT}/app.html"
echo "Starting server on ${URL}"

# Start server in background
/usr/bin/python3 -m http.server $PORT >/tmp/insan-app-server.log 2>&1 &
SRV_PID=$!

# Wait until the port actually accepts connections (max 10s)
for i in {1..40}; do
  if curl -s -o /dev/null "http://localhost:${PORT}/app.html"; then
    break
  fi
  sleep 0.25
done

open "$URL"

echo ""
echo "✅ التطبيق يعمل الآن على: $URL"
echo "اضغط Ctrl+C هنا لإيقاف الخادم."
echo ""

# Keep script alive until user kills it
trap "kill $SRV_PID 2>/dev/null; exit 0" INT TERM
wait $SRV_PID
