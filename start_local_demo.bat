@echo off
chcp 65001 >nul
title 3DGS & OpenUSD Portfolio - Local Demo Server
cd /d "%~dp0"

echo ========================================================
echo   Kangsik Ko - 3DGS ^& OpenUSD Personal R^&D Portfolio
echo   Local Laptop Demo Launcher
echo ========================================================
echo.

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js가 설치되어 있지 않습니다.
    echo https://nodejs.org 에서 Node.js ^(LTS^)를 먼저 설치해주세요.
    pause
    exit /b 1
)

if not exist "node_modules\" (
    echo [1/2] 최초 실행: 필요한 패키지를 설치하고 있습니다 ^(약 1~2분 소요^)...
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] 패키지 설치 중 오류가 발생했습니다.
        pause
        exit /b 1
    )
)

echo.
echo [2/2] 로컬 시연 서버를 시작합니다...
echo 브라우저에서 http://localhost:3000 이 자동으로 열립니다.
echo ^(종료하려면 이 창을 닫거나 Ctrl+C를 누르세요^)
echo.

start "" "http://localhost:3000"
call npm run dev
pause
