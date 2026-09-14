/**
 * Before / After Interactive Split Slider Component
 * Enables dynamic side-by-side comparison of 3DGS Reality Capture vs Proposed Infrastructure
 */

export class SplitSlider {
  constructor(containerId, viewer) {
    this.container = document.getElementById(containerId);
    this.viewer = viewer;
    this.isDragging = false;
    this.splitRatio = 0.5;

    this.splitLine = document.getElementById('split-line');
    this.splitHandle = document.getElementById('split-handle');
    this.splitToggleBtn = document.getElementById('btn-toggle-split');
    this.isActive = false;

    this.init();
  }

  init() {
    if (!this.container || !this.splitLine) return;

    if (this.splitToggleBtn) {
      this.splitToggleBtn.addEventListener('click', () => {
        this.toggle();
      });
    }

    // Drag handle events
    const startDrag = (e) => {
      if (!this.isActive) return;
      this.isDragging = true;
      e.preventDefault();
    };

    const onDrag = (e) => {
      if (!this.isDragging || !this.isActive) return;
      const rect = this.container.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
      this.splitRatio = x / rect.width;
      this.updatePosition();
    };

    const stopDrag = () => {
      this.isDragging = false;
    };

    this.splitLine.addEventListener('mousedown', startDrag);
    window.addEventListener('mousemove', onDrag);
    window.addEventListener('mouseup', stopDrag);

    this.splitLine.addEventListener('touchstart', startDrag, { passive: false });
    window.addEventListener('touchmove', onDrag);
    window.addEventListener('touchend', stopDrag);
  }

  toggle() {
    this.isActive = !this.isActive;
    if (this.splitLine) {
      this.splitLine.style.display = this.isActive ? 'block' : 'none';
    }
    const tagLeft = document.getElementById('split-tag-left');
    const tagRight = document.getElementById('split-tag-right');
    if (tagLeft) tagLeft.style.display = this.isActive ? 'block' : 'none';
    if (tagRight) tagRight.style.display = this.isActive ? 'block' : 'none';

    if (this.splitToggleBtn) {
      this.splitToggleBtn.classList.toggle('active', this.isActive);
    }

    if (this.viewer) {
      this.viewer.setSplitActive(this.isActive, this.splitRatio);
    }
  }

  updatePosition() {
    const pct = this.splitRatio * 100;
    if (this.splitLine) {
      this.splitLine.style.left = `${pct}%`;
    }
    if (this.viewer) {
      this.viewer.setSplitActive(this.isActive, this.splitRatio);
    }
  }
}
