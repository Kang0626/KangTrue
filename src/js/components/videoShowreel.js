/**
 * Showreel Video Theater Component
 * Interactive HD player with timeline chapters and technical step sync
 */
import { SHOWREEL_CHAPTERS } from '../data/projectsData.js';

export class VideoShowreel {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.chapters = SHOWREEL_CHAPTERS;
    this.currentChapterIndex = 0;
    this.isPlaying = false;
    this.progress = 0;
    this.animationId = null;

    this.playOverlay = document.getElementById('video-play-overlay');
    this.videoCanvas = document.getElementById('showreel-canvas');
    this.chaptersBar = document.getElementById('theater-chapters');
    this.chapterInfoEl = document.getElementById('current-chapter-desc');
    this.timecodeEl = document.getElementById('current-timecode');

    this.init();
  }

  init() {
    this.renderChapters();
    this.setupCanvas();
    this.initEvents();
    this.updateChapterUI(0);
  }

  renderChapters() {
    if (!this.chaptersBar) return;
    this.chaptersBar.innerHTML = '';

    this.chapters.forEach((ch, idx) => {
      const btn = document.createElement('button');
      btn.className = `chapter-btn ${idx === 0 ? 'active' : ''}`;
      btn.innerHTML = `<span class="badge badge-cyan" style="font-size:0.65rem">${ch.timecode}</span> ${ch.title.split('. ')[1]}`;
      btn.addEventListener('click', () => {
        this.seekToChapter(idx);
      });
      this.chaptersBar.appendChild(btn);
    });
  }

  setupCanvas() {
    if (!this.videoCanvas) return;
    this.ctx = this.videoCanvas.getContext('2d');
    this.drawVideoFrame();
  }

  drawVideoFrame() {
    if (!this.ctx || !this.videoCanvas) return;
    const w = this.videoCanvas.width = this.videoCanvas.clientWidth;
    const h = this.videoCanvas.height = this.videoCanvas.clientHeight;

    const ch = this.chapters[this.currentChapterIndex];

    // Background Gradient simulating high-end 3DGS render sequence
    const grad = this.ctx.createLinearGradient(0, 0, w, h);
    if (this.currentChapterIndex === 0) {
      grad.addColorStop(0, '#0f172a');
      grad.addColorStop(1, '#020617');
    } else if (this.currentChapterIndex === 1) {
      grad.addColorStop(0, '#064e3b');
      grad.addColorStop(1, '#022c22');
    } else if (this.currentChapterIndex === 2) {
      grad.addColorStop(0, '#1e1b4b');
      grad.addColorStop(1, '#0f172a');
    } else if (this.currentChapterIndex === 3) {
      grad.addColorStop(0, '#312e81');
      grad.addColorStop(1, '#1e293b');
    } else {
      grad.addColorStop(0, '#0c4a6e');
      grad.addColorStop(1, '#082f49');
    }

    this.ctx.fillStyle = grad;
    this.ctx.fillRect(0, 0, w, h);

    // Simulated Grid & 3DGS particles visual in video
    this.ctx.strokeStyle = 'rgba(0, 242, 254, 0.15)';
    this.ctx.lineWidth = 1;
    const step = 40;
    for (let x = 0; x < w; x += step) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, h);
      this.ctx.stroke();
    }
    for (let y = 0; y < h; y += step) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(w, y);
      this.ctx.stroke();
    }

    // Dynamic Central Visual
    this.ctx.fillStyle = '#00f2fe';
    this.ctx.font = 'bold 24px Outfit, sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(ch.title, w / 2, h / 2 - 20);

    this.ctx.fillStyle = '#94a3b8';
    this.ctx.font = '14px JetBrains Mono, monospace';
    this.ctx.fillText(`[4K UHD 60FPS] Truescape Technical Pipeline Demo`, w / 2, h / 2 + 20);

    // Progress bar on bottom of video
    this.ctx.fillStyle = 'rgba(0, 242, 254, 0.2)';
    this.ctx.fillRect(0, h - 6, w, 6);
    this.ctx.fillStyle = '#00f2fe';
    this.ctx.fillRect(0, h - 6, w * this.progress, 6);
  }

  initEvents() {
    if (this.playOverlay) {
      this.playOverlay.addEventListener('click', () => {
        this.togglePlay();
      });
    }

    if (this.videoCanvas) {
      this.videoCanvas.addEventListener('click', () => {
        this.togglePlay();
      });
    }
  }

  togglePlay() {
    this.isPlaying = !this.isPlaying;
    if (this.playOverlay) {
      this.playOverlay.classList.toggle('hidden', this.isPlaying);
    }

    if (this.isPlaying) {
      this.startPlayback();
    } else {
      cancelAnimationFrame(this.animationId);
    }
  }

  startPlayback() {
    const loop = () => {
      if (!this.isPlaying) return;
      this.progress += 0.002;
      if (this.progress >= 1) {
        this.progress = 0;
        this.currentChapterIndex = (this.currentChapterIndex + 1) % this.chapters.length;
        this.updateChapterUI(this.currentChapterIndex);
      }
      this.drawVideoFrame();
      this.animationId = requestAnimationFrame(loop);
    };
    this.animationId = requestAnimationFrame(loop);
  }

  seekToChapter(index) {
    this.currentChapterIndex = index;
    this.progress = 0;
    this.updateChapterUI(index);
    this.drawVideoFrame();
  }

  updateChapterUI(index) {
    const ch = this.chapters[index];
    if (this.chapterInfoEl) {
      this.chapterInfoEl.textContent = ch.desc;
    }
    if (this.timecodeEl) {
      this.timecodeEl.textContent = `${ch.timecode} / 03:00`;
    }

    if (this.chaptersBar) {
      const btns = this.chaptersBar.querySelectorAll('.chapter-btn');
      btns.forEach((btn, idx) => {
        btn.classList.toggle('active', idx === index);
      });
    }
  }
}
