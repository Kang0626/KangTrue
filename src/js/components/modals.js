/**
 * Modals & Interaction Management
 * Handles Resume / CV inspection, Contact modal, and Custom Splat file upload
 */

export class ModalManager {
  constructor() {
    this.resumeModal = document.getElementById('modal-resume');
    this.contactModal = document.getElementById('modal-contact');
    this.dropzoneModal = document.getElementById('modal-dropzone');

    this.init();
  }

  init() {
    // Open resume button
    const openResumeBtns = document.querySelectorAll('.js-open-resume');
    openResumeBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openModal(this.resumeModal);
      });
    });

    // Open contact button
    const openContactBtns = document.querySelectorAll('.js-open-contact');
    openContactBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openModal(this.contactModal);
      });
    });

    // Open dropzone button
    const openDropzoneBtns = document.querySelectorAll('.js-open-dropzone');
    openDropzoneBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openModal(this.dropzoneModal);
      });
    });

    // Close buttons
    const closeBtns = document.querySelectorAll('.modal-close-btn');
    closeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.closeAllModals();
      });
    });

    // Close on backdrop click
    const backdrops = document.querySelectorAll('.modal-backdrop');
    backdrops.forEach(backdrop => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          this.closeAllModals();
        }
      });
    });

    // Close on ESC
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAllModals();
      }
    });

    // Handle Contact Form Submit
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for reaching out! Your message has been prepared for the Truescape recruitment submission.');
        this.closeAllModals();
      });
    }
  }

  openModal(modal) {
    if (!modal) return;
    this.closeAllModals();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeAllModals() {
    const activeModals = document.querySelectorAll('.modal-backdrop.active');
    activeModals.forEach(m => m.classList.remove('active'));
    document.body.style.overflow = '';
  }
}
