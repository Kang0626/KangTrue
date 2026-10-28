#!/bin/bash
cd "$(dirname "$0")"

echo "========================================================"
echo "  Kangsik Ko - 3DGS & OpenUSD Personal R&D Portfolio"
echo "  Local Laptop Demo Launcher"
echo "========================================================"
echo ""

if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js가 설치되어 있지 않습니다. https://nodejs.org 에서 LTS 버전을 설치해주세요."
    read -p "Press Enter to exit..."
    exit 1
fi

if [ ! -d "node_modules" ]; then
    echo "[1/2] 최초 실행: 필요한 패키지를 설치하고 있습니다..."
    npm install
fi

echo "[2/2] 로컬 시연 서버를 시작합니다 (http://localhost:3000)..."
(sleep 3 && open "http://localhost:3000") &
npm run dev
