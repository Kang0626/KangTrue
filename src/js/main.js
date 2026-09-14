/**
 * Truescape 3DGS R&D Case Study Controller
 * Christchurch, New Zealand | R&D Case Study
 * Author: Kangsik (Kang) Ko | Senior VFX Compositor & Pipeline R&D
 */
import { ARTIST_INFO, CASE_STUDY, CORE_SKILLS } from './data/portfolioData.js';
import { AholoSplatViewer } from './viewer/aholoViewer.js';
import { LightboxModal } from './components/lightboxModal.js';
import { SecurityGateModal } from './components/securityGateModal.js';

class TruescapeCaseStudyController {
  constructor() {
    this.splitRatio = 0.5;
    this.isDraggingSplit = false;
    this.aholoViewer = null;
    this.lightbox = null;
    this.isPortfolioInitialized = false;
    this.hasBoundGlobalEvents = false;
    this.hasBoundViewerControls = false;

    // Initialize Security Gate (Reviewer-friendly direct entry)
    this.securityGate = new SecurityGateModal({
      onUnlock: () => this.onAuthenticated(),
      onLock: () => this.onLocked()
    });
  }

  onAuthenticated() {
    if (!this.isPortfolioInitialized) {
      this.initPortfolio();
      this.isPortfolioInitialized = true;
    } else if (!this.aholoViewer) {
      this.setup3DGSViewer();
    }
  }

  onLocked() {
    if (this.aholoViewer) {
      try {
        this.aholoViewer.dispose();
      } catch (err) {
        console.warn('[Security] Error disposing 3DGS viewer on lock:', err);
      }
      this.aholoViewer = null;
    }
  }

  initPortfolio() {
    this.setupLightbox();
    this.setup3DGSViewer();
    this.setupVerificationSection();
    this.setupCompetencies();
    if (!this.hasBoundGlobalEvents) {
      this.setupNavigation();
      this.hasBoundGlobalEvents = true;
    }
  }

  /* --------------------------------------------------------------------------
     Lightbox Inspection for Points & Reality Controller UI
     -------------------------------------------------------------------------- */
  setupLightbox() {
    this.lightbox = new LightboxModal();
    const triggerWrap = document.getElementById('controller-img-wrap');
    const triggerImg = document.getElementById('controller-screenshot-img');

    if (triggerWrap && triggerImg) {
      triggerWrap.addEventListener('click', (e) => {
        e.preventDefault();
        this.lightbox.open(
          triggerImg.src,
          'Points & Reality 3DGS Controller (v2.248) - High-Resolution Interface Inspection'
        );
      });
    }
  }

  /* --------------------------------------------------------------------------
     01. 3DGS Hero Viewer (WebGL2 Aholo Engine + Anti-CLS Preloader)
     -------------------------------------------------------------------------- */
  setup3DGSViewer() {
    const container = document.getElementById('aholo-viewport-container');
    const preloader = document.getElementById('viewer-preloader');
    const toast = document.getElementById('preset-toast');
    const bookmarksContainer = document.getElementById('camera-bookmarks-container');
    const fsBtn = document.getElementById('btn-fullscreen');
    const card = document.getElementById('aholo-card');
    const sceneSelect = document.getElementById('select-aholo-scene');
    const sceneNameEl = document.getElementById('meta-scene-name');
    const sunSlider = document.getElementById('slider-sun-azimuth');
    const sunValEl = document.getElementById('sun-azimuth-val');
    const contextTitle = document.getElementById('context-preset-title');
    const contextDesc = document.getElementById('context-preset-desc');

    if (!container) return;
    
    // Clear old canvases if any, preserving preloader & HUD
    const oldCanvases = container.querySelectorAll('canvas');
    oldCanvases.forEach(c => c.remove());

    const bookmarkDescriptions = {
      eyelevel: {
        title: "1.6m Human Eye-Level View (Default)",
        desc: "Ground pedestrian perspective calibrated for realistic visual impact assessment."
      },
      orbit: {
        title: "Orbit Overview",
        desc: "Wide 360° high-angle context showing full topography and turbine layout."
      },
      datum: {
        title: "1.8m Bench (1:1 Metric Scale)",
        desc: "Physical ground datum used to lock 1:1 metric scale against surveyed measurements."
      },
      shadow: {
        title: "Contact Shadow Zone",
        desc: "Low-angle perspective inspecting dynamic solar shadow casting and ambient occlusion."
      },
      structure: {
        title: "CAD Infrastructure Integration",
        desc: "Close-up engineering view of the procedural shelter framework and structural connections."
      }
    };

    const updateContextBanner = (presetKey) => {
      if (contextTitle && contextDesc && bookmarkDescriptions[presetKey]) {
        contextTitle.textContent = bookmarkDescriptions[presetKey].title;
        contextDesc.textContent = bookmarkDescriptions[presetKey].desc;
      }
    };

    let hasDismissedPreloader = false;
    const dismissPreloader = () => {
      if (preloader && !hasDismissedPreloader) {
        hasDismissedPreloader = true;
        preloader.classList.add('fade-out');
      }
    };

    // 1. Instantiate native Aholo 3DGS Viewer
    this.aholoViewer = new AholoSplatViewer({
      initialScene: 'windfarm',
      onTelemetryUpdate: (data) => {
        dismissPreloader();
        const fpsEl = document.getElementById('hud-fps');
        const splatsEl = document.getElementById('hud-splats');
        const coordsEl = document.getElementById('hud-coords');
        if (fpsEl) fpsEl.textContent = `${data.fps} FPS`;
        if (splatsEl) splatsEl.textContent = data.splatsFormatted;
        if (coordsEl && this.aholoViewer?.camera) {
          const cam = this.aholoViewer.camera;
          coordsEl.textContent = `${cam.position.x.toFixed(1)}, ${cam.position.z.toFixed(1)}`;
        }
      }
    });

    this.aholoViewer.init(container);
    updateContextBanner('eyelevel');

    // Fallback safety for preloader fade-out
    setTimeout(dismissPreloader, 1800);

    // Register UI control listeners only once
    if (this.hasBoundViewerControls) return;
    this.hasBoundViewerControls = true;

    // 2. Camera Bookmarks (Segmented Controls)
    if (bookmarksContainer) {
      const buttons = bookmarksContainer.querySelectorAll('.seg-btn');
      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          buttons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          const preset = btn.getAttribute('data-preset');
          this.aholoViewer.setCameraPreset(preset);
          updateContextBanner(preset);

          const desc = bookmarkDescriptions[preset]?.title || preset;
          if (toast) {
            toast.textContent = `${desc} Active`;
            toast.classList.add('visible');
            setTimeout(() => toast.classList.remove('visible'), 2000);
          }
        });
      });
    }

    // 3. Scene Dropdown
    if (sceneSelect) {
      sceneSelect.addEventListener('change', (e) => {
        const sceneId = e.target.value;
        this.aholoViewer.loadScene(sceneId);
        if (sceneNameEl) {
          const filename = sceneId === 'windfarm' ? 'Canterbury_Wind_Park.sog' :
                           sceneId === 'substation' ? 'Southern_Alps_220kV.sog' : 'Waikato_Expressway.sog';
          sceneNameEl.textContent = filename;
        }
        if (toast) {
          toast.textContent = `Loaded ${sceneId.toUpperCase()} (SOG Stream)`;
          toast.classList.add('visible');
          setTimeout(() => toast.classList.remove('visible'), 2000);
        }
      });
    }

    // 4. Render Passes (3DGS, SfM Rings, CAD Wire, Depth)
    const passButtons = document.querySelectorAll('.hud-pill-btn[data-mode]');
    passButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        passButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const mode = btn.getAttribute('data-mode');
        this.aholoViewer.setRenderMode(mode);
        if (toast) {
          toast.textContent = `Render Pass: ${mode.toUpperCase()}`;
          toast.classList.add('visible');
          setTimeout(() => toast.classList.remove('visible'), 1500);
        }
      });
    });

    // 5. Navigation Mode (Orbit vs Walk)
    const navButtons = document.querySelectorAll('.hud-pill-btn[data-nav]');
    navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        navButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const nav = btn.getAttribute('data-nav');
        this.aholoViewer.setNavigationMode(nav);
        if (toast) {
          toast.textContent = nav === 'walk' ? 'Walk Mode Active (WASD / Arrows)' : 'Orbit Navigation Active';
          toast.classList.add('visible');
          setTimeout(() => toast.classList.remove('visible'), 2000);
        }
      });
    });

    // 6. Solar Azimuth Slider
    if (sunSlider) {
      sunSlider.addEventListener('input', (e) => {
        const angle = parseFloat(e.target.value);
        if (sunValEl) sunValEl.textContent = `${angle.toFixed(0)}°`;
        this.aholoViewer.setSunAzimuth(angle);
      });
    }

    // 7. Fullscreen Toggle
    if (fsBtn && card) {
      fsBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
          card.requestFullscreen().catch(err => console.warn(err));
        } else {
          document.exitFullscreen();
        }
      });
    }
  }

  /* --------------------------------------------------------------------------
     Dual-Plate Interactive Comparator Slider
     -------------------------------------------------------------------------- */
  setupVerificationSection() {
    const splitViewport = document.getElementById('split-viewport');
    const clippedWrap = document.getElementById('split-clipped-wrap');
    const dividerBar = document.getElementById('split-divider-bar');

    if (splitViewport && clippedWrap && dividerBar) {
      const updateSplit = (clientX) => {
        const rect = splitViewport.getBoundingClientRect();
        const offsetX = Math.max(0, Math.min(rect.width, clientX - rect.left));
        this.splitRatio = offsetX / rect.width;
        const pct = (this.splitRatio * 100).toFixed(2);

        clippedWrap.style.width = `${pct}%`;
        dividerBar.style.left = `${pct}%`;
      };

      splitViewport.addEventListener('mousedown', (e) => {
        this.isDraggingSplit = true;
        updateSplit(e.clientX);
      });

      window.addEventListener('mousemove', (e) => {
        if (!this.isDraggingSplit) return;
        updateSplit(e.clientX);
      });

      window.addEventListener('mouseup', () => {
        this.isDraggingSplit = false;
      });

      splitViewport.addEventListener('touchstart', (e) => {
        this.isDraggingSplit = true;
        if (e.touches.length > 0) updateSplit(e.touches[0].clientX);
      }, { passive: true });

      window.addEventListener('touchmove', (e) => {
        if (!this.isDraggingSplit) return;
        if (e.touches.length > 0) updateSplit(e.touches[0].clientX);
      }, { passive: true });

      window.addEventListener('touchend', () => {
        this.isDraggingSplit = false;
      });
    }
  }

  /* --------------------------------------------------------------------------
     Render Core Competencies
     -------------------------------------------------------------------------- */
  setupCompetencies() {
    const compWrap = document.getElementById('skills-chips-wrap');
    if (compWrap) {
      compWrap.innerHTML = CORE_SKILLS.map(skill => `
        <span class="comp-tag">${skill}</span>
      `).join('');
    }
  }

  /* --------------------------------------------------------------------------
     Smooth Navigation & Active Spy
     -------------------------------------------------------------------------- */
  setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, .nav-btn-highlight');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
          e.preventDefault();
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            if (link.classList.contains('nav-link')) {
              link.classList.add('active');
            }
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });

    window.addEventListener('scroll', () => {
      const sections = [
        'section-3dgs-intro',
        'section-why-truescape',
        'section-workflow',
        'section-evaluation',
        'section-about'
      ];
      const scrollPos = window.scrollY + 160;

      sections.forEach(secId => {
        const el = document.getElementById(secId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            document.querySelectorAll('.nav-link').forEach(link => {
              link.classList.toggle('active', link.getAttribute('href') === `#${secId}`);
            });
          }
        }
      });
    }, { passive: true });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new TruescapeCaseStudyController();
});
