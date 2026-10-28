# 3DGS & OpenUSD Personal R&D Portfolio — Kangsik (Kang) Ko

개인 3D Gaussian Splatting 리서치, Houdini SOP 포인트 클리닝, 그리고 Solaris(OpenUSD) + 실제 3DGS 하이브리드 합성 케이스 스터디 포트폴리오입니다.

---

## 💻 다른 노트북(로컬 환경)에서 다운로드 및 실행하는 방법

모든 이미지, 영상(`.mp4`, `.gif`), 그리고 3DGS 뷰어 에셋(`.sog`, `.webp` 청크)이 이 저장소에 포함되어 있어 **로컬 노트북에서 오프라인/고속 환경으로 동일하게 실행**할 수 있습니다.

### 사전 준비 (최초 1회)
노트북에 **Node.js (v18 이상 LTS 권장)**가 설치되어 있어야 합니다.
- 미설치 시 다운로드: [https://nodejs.org/](https://nodejs.org/)

---

### 방법 A: ZIP 파일로 바로 다운로드 (Git 설치 불필요 · 가장 간편)

1. 노트북 브라우저에서 아래 링크를 열어 전체 프로젝트를 **ZIP으로 다운로드**합니다:
   - 👉 **[프로젝트 ZIP 바로 다운로드](https://github.com/Kang0626/KangTrue/archive/refs/heads/main.zip)**
2. 다운로드한 `KangTrue-main.zip` 파일의 압축을 원하는 폴더에 풉니다.
3. 폴더 안의 실행 파일을 더블클릭합니다:
   - **Windows 노트북**: `start_local_demo.bat` 더블클릭
   - **MacBook (macOS)**: `start_local_demo.command` 실행 (또는 터미널에서 `npm install && npm run dev`)
4. 자동으로 필요한 패키지가 설치된 후 브라우저에서 **`http://localhost:3000`** 이 열립니다.

---

### 방법 B: 터미널(Git / PowerShell)로 클론하여 실행

```bash
# 1. 저장소 클론
git clone https://github.com/Kang0626/KangTrue.git
cd KangTrue

# 2. 패키지 설치 (최초 1회)
npm install

# 3. 로컬 서버 실행
npm run dev
```
이후 브라우저에서 **`http://localhost:3000`** 으로 접속하면 됩니다.

---

### 💡 오프라인 미팅 시연 팁
- 미팅 장소에 가기 전(집이나 와이파이 환경에서) 노트북에서 **`start_local_demo.bat`** (또는 `npm install`)을 **한 번만 미리 실행**해 두시면, `node_modules`가 설치되어 이후에는 **인터넷 연결이 전혀 없는 오프라인 상태에서도** `start_local_demo.bat` 더블클릭만으로 즉시 3DGS 뷰어와 모든 영상을 시연할 수 있습니다.
