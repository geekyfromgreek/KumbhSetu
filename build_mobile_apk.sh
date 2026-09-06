#!/usr/bin/env bash

# Kumbh Setu - One-Click Android Mobile Package Generator
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONTEND_DIR="$SCRIPT_DIR/kumbh-setu/frontend"

echo "====================================================================="
echo "       KUMBH SETU — MOBILE APK PACKAGE BUILDER (CAPACITOR)           "
echo "====================================================================="
echo ""

cd "$FRONTEND_DIR"

# 1. Check Node & npm
if ! command -v npm &> /dev/null; then
    echo "[ERROR] npm is required to build the mobile APK package."
    exit 1
fi

echo "[1/4] Installing Capacitor mobile runtime dependencies..."
npm install --save-dev @capacitor/cli @capacitor/core @capacitor/android

echo "[2/4] Initializing Android Platform..."
if [ ! -d "android" ]; then
    npx cap add android
else
    echo "Android platform already initialized."
fi

echo "[3/4] Syncing web assets and plugins to Android container..."
npx cap sync android

echo "[4/4] Mobile Package Ready!"
echo ""
echo "====================================================================="
echo "  Success! Your Android Mobile Project is ready in:"
echo "  $FRONTEND_DIR/android"
echo ""
echo "  To build the final signed .apk file:"
echo "  Option A (Android Studio): Run 'npx cap open android' -> Build > Build APK"
echo "  Option B (CLI Gradle)    : cd $FRONTEND_DIR/android && ./gradlew assembleDebug"
echo "  The resulting APK will be at:"
echo "  $FRONTEND_DIR/android/app/build/outputs/apk/debug/app-debug.apk"
echo "====================================================================="
