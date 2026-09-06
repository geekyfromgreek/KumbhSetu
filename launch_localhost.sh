#!/usr/bin/env bash

# KumbhSetu Simhastha 2027 Full Stack Launcher (Linux / macOS)
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$SCRIPT_DIR/kumbh-setu/backend"
FRONTEND_DIR="$SCRIPT_DIR/kumbh-setu/frontend"

echo "====================================================================="
echo "           KUMBH SETU - SIMHASTHA 2027 FULL STACK LAUNCHER           "
echo "====================================================================="
echo ""

# 1. Check Python
if ! command -v python3 &> /dev/null; then
    echo "[ERROR] python3 is not installed or not in PATH."
    exit 1
# 0. Free busy ports if previously running
fuser -k 8000/tcp 2>/dev/null || true
fuser -k 3000/tcp 2>/dev/null || true
sleep 1

echo "[1/3] Starting FastAPI Backend on port 8000..."
cd "$BACKEND_DIR"
python3 -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload &
BACKEND_PID=$!

sleep 2

echo "[2/3] Starting Frontend Server on port 3000..."
cd "$FRONTEND_DIR"
if command -v npx &> /dev/null; then
    npx -y serve -p 3000 . &
    FRONTEND_PID=$!
else
    echo "[INFO] Node/npx not found. Using python3 http.server on port 3000..."
    python3 -m http.server 3000 &
    FRONTEND_PID=$!
fi

sleep 1

# Detect LAN IP
LAN_IP=$(hostname -I 2>/dev/null | awk '{print $1}' || echo "localhost")

echo ""
echo "====================================================================="
echo "  KumbhSetu Full-Stack is now running!"
echo "  -------------------------------------------------------------"
echo "  * PC Browser      : http://localhost:3000/yatri_home.html"
echo "  * Mobile Phone URL: http://${LAN_IP}:3000/yatri_home.html"
echo "  * Backend API Docs: http://localhost:8000/docs"
echo "  -------------------------------------------------------------"
echo "  [📱 Mobile Tip]: Open http://${LAN_IP}:3000/yatri_home.html on your"
echo "  phone's browser (Chrome/Safari) and tap 'Add to Home Screen' to"
echo "  install the complete standalone Kumbh Setu app with all data!"
echo "====================================================================="
echo ""

# Try opening browser if command exists
if command -v xdg-open &> /dev/null; then
    xdg-open "http://localhost:3000/" > /dev/null 2>&1 || true
elif command -v open &> /dev/null; then
    open "http://localhost:3000/" > /dev/null 2>&1 || true
fi

echo "Press [CTRL+C] to stop all servers."

trap "echo 'Shutting down KumbhSetu servers...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit 0" SIGINT SIGTERM

wait
