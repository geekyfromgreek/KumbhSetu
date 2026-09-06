@echo off
TITLE KumbhSetu Simhastha 2027 - Full Stack Launcher
COLOR 0A
cls

echo =====================================================================
echo            KUMBH SETU - SIMHASTHA 2027 FULL STACK LAUNCHER
echo =====================================================================
echo.
echo [1/3] Checking environment...

:: Check Python
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed or not found in PATH.
    echo Please install Python 3.9+ from https://www.python.org/
    pause
    exit /b 1
)

:: Locate directory
set "ROOT_DIR=%~dp0"
set "BACKEND_DIR=%ROOT_DIR%kumbh-setu\backend"
set "FRONTEND_DIR=%ROOT_DIR%kumbh-setu\frontend"

echo [OK] Project root: %ROOT_DIR%
echo.

:: 2. Start Backend in separate window
echo [2/3] Launching FastAPI Backend on port 8000...
start "KumbhSetu-Backend-8000" cmd /k "cd /d "%BACKEND_DIR%" && echo Starting FastAPI uvicorn server... && python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"

:: Give backend a moment to initialize
timeout /t 3 /nobreak >nul

:: 3. Start Frontend
echo [3/3] Launching Frontend Server on port 3000...
where npx >nul 2>nul
if %errorlevel% equ 0 (
    start "KumbhSetu-Frontend-3000" cmd /k "cd /d "%FRONTEND_DIR%" && echo Starting web server with npx serve... && npx -y serve -p 3000 ."
) else (
    echo [INFO] Node.js not detected. Using Python HTTP Server for frontend...
    start "KumbhSetu-Frontend-3000" cmd /k "cd /d "%FRONTEND_DIR%" && echo Starting Python web server on port 3000... && python -m http.server 3000"
)

:: Wait 2 seconds and open browser
timeout /t 2 /nobreak >nul
echo.
echo =====================================================================
echo   KumbhSetu Full-Stack is now running!
echo   -------------------------------------------------------------
echo   * Launch Portal   : http://localhost:3000/index.html
echo   * Backend API     : http://localhost:8000/
echo   * API Docs        : http://localhost:8000/docs
echo =====================================================================
echo.
echo Opening browser to http://localhost:3000/index.html ...
start http://localhost:3000/index.html

echo.
echo Leave this window or the spawned windows open while using the app.
echo Press any key to exit this launcher window...
pause >nul
