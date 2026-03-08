@echo off
title Discord Bot

if not exist ".env" (
    echo .env file not found. Please run install.bat first.
    echo.
    pause
    exit /b 1
)

if not exist "node_modules" (
    echo Dependencies not installed. Please run install.bat first.
    echo.
    pause
    exit /b 1
)

echo Starting bot...
npm start

echo.
echo Bot stopped. Check the output above for any errors.
pause