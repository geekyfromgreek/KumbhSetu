#!/bin/bash
# KumbhSetu Simhastha 2027 - Full Stack Local Launcher (Linux / macOS)

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="${SCRIPT_DIR}/backend"
FRONTEND_DIR="${SCRIPT_DIR}/frontend"

echo "====================================================================="
echo "           KUMBH SETU - SIMHASTHA 2027 FULL STACK LAUNCHER          "
echo "====================================================================="
echo ""

# Check Python
if ! command -v python3 &> /dev/null; then
    echo "[ERROR] python3 could not be found. Please install Python 3.9+."
    exit 1
fi

echo "[OK] Project root: ${SCRIPT_DIR}"
echo ""

# Kill any existing processes on 8000 or 3000
echo "Checking existing ports..."
fuser -k 8000/tcp 2>/dev/null || true
fuser -k 3000/tcp 2>/dev/null || true

# 1. Start Backend on port 8000
echo "[1/2] Launching FastAPI Backend on http://localhost:8000 ..."
(cd "${BACKEND_DIR}" && python3 -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload) &
BACKEND_PID=$!

sleep 2

# 2. Start Frontend on port 3000
echo "[2/2] Launching Frontend Server on http://localhost:3000 ..."
(cd "${FRONTEND_DIR}" && python3 -m http.server 3000) &
FRONTEND_PID=$!

echo ""
echo "====================================================================="
echo "  KumbhSetu Full-Stack is now running locally!"
echo "  -------------------------------------------------------------"
echo "  * Frontend Web UI : http://localhost:3000/ (or http://localhost:8000/)"
echo "  * Backend API     : http://localhost:8000/"
echo "  * API Docs        : http://localhost:8000/docs"
echo "  -------------------------------------------------------------"
echo "  Press Ctrl+C to stop both servers."
echo "====================================================================="

cleanup() {
    echo ""
    echo "Stopping KumbhSetu servers..."
    kill ${BACKEND_PID} 2>/dev/null || true
    kill ${FRONTEND_PID} 2>/dev/null || true
    exit 0
}

trap cleanup INT TERM

wait
