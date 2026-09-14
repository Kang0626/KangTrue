/**
 * Lightbox Modal Component
 * Displays high-resolution UI screenshots (e.g. Points & Reality Controller)
 * with zoom inspection, pan support, and keyboard accessibility.
 */

export class LightboxModal {
  constructor() {
    this.overlay = null;
    this.modalImg = null;
    this.captionEl = null;
    this.scale = 1;
    this.isPanning = false;
    this.startX = 0;
    this.startY = 0;
    this.translateX = 0;
    this.translateY = 0;

    this.init();
  }

  init() {
    // Remove existing if any
    const existing = document.getElementById('global-lightbox-overlay');
    if (existing) existing.remove();

    this.overlay = document.createElement('div');
    this.overlay.id = 'global-lightbox-overlay';
    this.overlay.className = 'lightbox-backdrop';
    this.overlay.innerHTML = `
      <div class="lightbox-toolbar">
        <div class="lightbox-title-wrap">
          <span class="lightbox-badge">HIGH-RES INSPECTION</span>
          <span class="lightbox-filename" id="lightbox-label">Points & Reality 3DGS Controller UI (v2.248)</span>
        </div>
        <div class="lightbox-controls">
          <button class="lightbox-btn" id="lightbox-zoom-in" title="Zoom In">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
          </button>
          <button class="lightbox-btn" id="lightbox-zoom-out" title="Zoom Out">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
          </button>
          <button class="lightbox-btn" id="lightbox-reset" title="Reset Zoom">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
          </button>
          <button class="lightbox-btn lightbox-btn-close" id="lightbox-close" title="Close (Esc)">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      </div>
      <div class="lightbox-viewport" id="lightbox-viewport">
        <div class="lightbox-stage" id="lightbox-stage">
          <img src="" alt="Enlarged inspection" class="lightbox-img" id="lightbox-img" />
        </div>
      </div>
      <div class="lightbox-footer">
        <span class="lightbox-hint">💡 Click &amp; drag to pan &bull; Scroll or use buttons to zoom &bull; Press Esc to close</span>
        <span class="lightbox-scale-indicator" id="lightbox-scale-val">100%</span>
      </div>
    `;

    document.body.appendChild(this.overlay);

    this.modalImg = this.overlay.querySelector('#lightbox-img');
    this.stage = this.overlay.querySelector('#lightbox-stage');
    this.viewport = this.overlay.querySelector('#lightbox-viewport');
    this.scaleValEl = this.overlay.querySelector('#lightbox-scale-val');
    this.labelEl = this.overlay.querySelector('#lightbox-label');

    this.bindEvents();
  }

  bindEvents() {
    const closeBtn = this.overlay.querySelector('#lightbox-close');
    closeBtn.addEventListener('click', () => this.close());

    // Close on backdrop click (outside image)
    this.viewport.addEventListener('click', (e) => {
      if (e.target === this.viewport || e.target === this.stage) {
        this.close();
      }
    });

    // Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });

    // Zoom controls
    const zoomInBtn = this.overlay.querySelector('#lightbox-zoom-in');
    const zoomOutBtn = this.overlay.querySelector('#lightbox-zoom-out');
    const resetBtn = this.overlay.querySelector('#lightbox-reset');

    zoomInBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.setZoom(this.scale + 0.3);
    });

    zoomOutBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.setZoom(this.scale - 0.3);
    });

    resetBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.resetTransform();
    });

    // Mouse wheel zoom
    this.viewport.addEventListener('wheel', (e) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.2 : 0.2;
      this.setZoom(this.scale + delta);
    }, { passive: false });

    // Drag to pan
    this.stage.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return;
      this.isPanning = true;
      this.startX = e.clientX - this.translateX;
      this.startY = e.clientY - this.translateY;
      this.stage.style.cursor = 'grabbing';
      e.preventDefault();
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isPanning) return;
      this.translateX = e.clientX - this.startX;
      this.translateY = e.clientY - this.startY;
      this.applyTransform();
    });

    window.addEventListener('mouseup', () => {
      if (this.isPanning) {
        this.isPanning = false;
        this.stage.style.cursor = this.scale > 1 ? 'grab' : 'default';
      }
    });
  }

  setZoom(newScale) {
    this.scale = Math.max(0.6, Math.min(3.5, newScale));
    this.scaleValEl.textContent = `${Math.round(this.scale * 100)}%`;
    this.stage.style.cursor = this.scale > 1 ? 'grab' : 'default';
    this.applyTransform();
  }

  resetTransform() {
    this.scale = 1;
    this.translateX = 0;
    this.translateY = 0;
    this.scaleValEl.textContent = '100%';
    this.stage.style.cursor = 'default';
    this.applyTransform();
  }

  applyTransform() {
    this.stage.style.transform = `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale})`;
  }

  open(src, captionText = 'Points & Reality 3DGS Controller UI (v2.248)') {
    if (!this.overlay) this.init();
    this.modalImg.src = src;
    if (this.labelEl) this.labelEl.textContent = captionText;
    this.resetTransform();
    this.overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  close() {
    if (!this.overlay) return;
    this.overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  isOpen() {
    return this.overlay && this.overlay.classList.contains('active');
  }

  /**
   * Attach lightbox trigger to any image element
   */
  attachTrigger(imgElement, caption = '') {
    if (!imgElement) return;
    imgElement.style.cursor = 'zoom-in';
    imgElement.setAttribute('title', 'Click to enlarge full high-res interface');
    imgElement.addEventListener('click', (e) => {
      e.preventDefault();
      this.open(imgElement.src, caption || imgElement.alt || 'High-Resolution UI');
    });
  }
}
