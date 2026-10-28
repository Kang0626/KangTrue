#!/bin/bash
cd "$(dirname "$0")"

# Load macOS shell paths (Homebrew on Apple Silicon, Intel, NVM, and user zsh env)
export PATH="/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:$PATH"
if [ -s "$HOME/.nvm/nvm.sh" ]; then
    . "$HOME/.nvm/nvm.sh"
fi
if [ -f "$HOME/.zprofile" ]; then
    source "$HOME/.zprofile" 2>/dev/null
fi

echo "========================================================"
echo "  Kangsik Ko - 3DGS & OpenUSD Personal R&D Portfolio"
echo "  Local Laptop Demo Launcher (macOS)"
echo "========================================================"
echo ""

if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js가 설치되어 있지 않거나 환경변수 경로를 찾을 수 없습니다."
    echo "https://nodejs.org 에서 Mac용 LTS 버전을 설치해주세요."
    echo ""
    read -p "엔터 키를 누르면 종료합니다..."
    exit 1
fi

echo "Node.js 버전: $(node -v)"
echo "NPM 버전:     $(npm -v)"
echo ""

if [ ! -d "node_modules" ]; then
    echo "[1/2] 최초 실행: 필요한 패키지를 설치하고 있습니다 (약 1분 소요)..."
    npm install
    if [ $? -ne 0 ]; then
        echo "[ERROR] 패키지 설치 중 오류가 발생했습니다."
        read -p "엔터 키를 누르면 종료합니다..."
        exit 1
    fi
fi

echo ""
echo "[2/2] 로컬 시연 서버를 시작합니다..."
echo "서버가 준비되면 브라우저(http://localhost:3000)가 자동으로 열립니다."
echo "(종료하려면 이 터미널 창에서 Control + C 를 누르세요)"
echo ""

# Background loop: wait until Next.js server is actually answering on localhost:3000 before opening browser
(
    for i in {1..40}; do
        if curl -s -o /dev/null "http://localhost:3000" 2>/dev/null; then
            open "http://localhost:3000"
            exit 0
        fi
        sleep 1
    done
    # Fallback open if loop times out
    open "http://localhost:3000"
) &

npm run dev
