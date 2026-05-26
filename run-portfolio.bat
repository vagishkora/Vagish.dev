@echo off
echo ==========================================
echo Starting Vagish OS Portfolio Backend...
echo ==========================================

:: Start the node server in a new window
start "Portfolio Backend" cmd /k "node server.js"

echo.
echo Waiting for backend to initialize (3 seconds)...
timeout /t 3 >nul

echo.
echo Launching portfolio interface in browser...
start http://localhost:3001

echo.
echo ==========================================
echo Portfolio is now running at http://localhost:3001
echo Check the other Command Prompt window for backend logs.
echo ==========================================
pause
