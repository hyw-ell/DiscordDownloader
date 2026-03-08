@echo off

echo DiscordDownloader Bot Installer
echo ===============================
echo.

:: Check for Node.js
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js is not installed.
    echo Please download and install the latest LTS version from https://nodejs.org, then run this script again.
    echo.
    pause
    exit /b 1
)

for /f "tokens=*" %%v in ('node --version') do set nodeVersion=%%v
echo Node.js found: %nodeVersion%
echo.

:: Install dependencies
echo Installing dependencies...
call npm install

if %errorlevel% neq 0 (
    echo npm install failed. Please check the output above.
    echo.
    pause
    exit /b 1
)

echo Dependencies installed.
echo.

:: Skip .env setup if token already exists
set tokenFound=false
if exist ".env" (
    for /f "tokens=2 delims==" %%a in ('findstr /i "BOT_TOKEN" .env') do (
        if not "%%a"=="" set tokenFound=true
    )
)

if "%tokenFound%"=="true" (
    echo Bot token already configured, skipping setup.
) else (
    echo Bot Setup
    echo =========
    echo You will need a bot token from the Discord Developer Portal.
    echo If you don't have one, follow this guide to get one: https://discordjs.guide/legacy/preparations/app-setup.
    echo.
    set /p token="Enter your bot token: "
    if "%token%"=="" (
        echo No token entered. You can manually create a .env file with BOT_TOKEN=your_token_here
    ) else (
        echo BOT_TOKEN=%token%> .env
        echo .env file created.
    )
)

:: Optional Discord logging setup
echo.
echo Optional Setup
echo ==============
echo You can configure Discord channels for command logs and error reporting.
echo Press Enter to skip either of these.
echo.

set /p logChannel="Enter command log channel ID (optional): "
set /p errorChannel="Enter error channel ID (optional): "

if not "%logChannel%"=="" (
    powershell -Command "(Get-Content src\config.ts) -replace 'COMMAND_LOG:.+', 'COMMAND_LOG: ''%logChannel%'',' | Set-Content src\config.ts"
)

if not "%errorChannel%"=="" (
    powershell -Command "(Get-Content src\config.ts) -replace 'ERROR:.+', 'ERROR: ''%errorChannel%'',' | Set-Content src\config.ts"
)

echo.
echo Setup complete! Run start.bat to launch your bot.
echo.
pause