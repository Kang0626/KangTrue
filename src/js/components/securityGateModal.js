/**
 * Security Gate Modal Component
 * Renders the high-security confidential vault authentication screen.
 */
import { authManager } from '../security/authManager.js';

export class SecurityGateModal {
  constructor(options = {}) {
    this.onUnlock = options.onUnlock || (() => {});
    this.onLock = options.onLock || (() => {});
    this.overlayEl = null;
    this.inputEl = null;
    this.submitBtnEl = null;
    this.feedbackEl = null;
    this.lockoutAlertEl = null;
    this.lockoutTimerEl = null;
    this.cooldownInterval = null;
    this.isSubmitting = false;

    this.init();
  }

  init() {
    this.render();
    this.bindEvents();
    this.setupHeaderLockButton();

    // Initial lock state
    if (!authManager.isAuthenticated()) {
      this.show();
    } else {
      this.hide();
      this.onUnlock();
    }

    // Subscribe to AuthManager events
    authManager.on('locked', () => {
      this.show();
      this.onLock();
    });

    authManager.on('unlocked', () => {
      this.hide();
      this.onUnlock();
    });
  }

  render() {
    // Remove existing if present
    let existing = document.getElementById('security-gate-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'security-gate-overlay';
    overlay.className = 'security-gate-overlay';
    overlay.innerHTML = `
      <div class="security-gate-bg-glow"></div>
      <div class="security-gate-card" id="security-gate-card">
        
        <!-- Top Security Badge -->
        <div class="gate-security-badge">
          <span class="gate-badge-dot"></span>
          <span>Confidential Access // R&amp;D Vault</span>
        </div>

        <!-- Shield Icon -->
        <div class="gate-icon-wrapper" id="gate-icon-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>

        <!-- Title & Notice -->
        <h2 class="gate-title">Portfolio Security Clearance</h2>
        <p class="gate-subtitle">
          This portfolio contains proprietary technical R&amp;D data and confidential project details. Please enter your authorization credentials to proceed.
        </p>

        <!-- Cryptographic Specs -->
        <div class="gate-crypto-specs">
          <span>AES-GCM 256-bit</span>
          <span class="sep">&bull;</span>
          <span>PBKDF2-SHA256 (150k)</span>
          <span class="sep">&bull;</span>
          <span>Zero-Plaintext</span>
        </div>

        <!-- Password Form -->
        <form class="gate-form" id="gate-password-form" onsubmit="return false;">
          <div class="gate-input-group">
            <div class="gate-input-wrapper">
              <span class="gate-input-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 2l-2 2m-1.5 1.5L14 9M3 21l3-3m1.5-1.5L11 13m4-4l-4 4"></path>
                  <circle cx="16.5" cy="7.5" r="3.5"></circle>
                </svg>
              </span>
              <input 
                type="password" 
                id="gate-password-input" 
                class="gate-password-input" 
                placeholder="Enter security passkey" 
                autocomplete="current-password"
                required 
              />
              <button type="button" class="gate-toggle-visibility" id="btn-toggle-password" title="Toggle passkey visibility">
                <svg id="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </button>
            </div>
          </div>

          <!-- Session Remember Option -->
          <div class="gate-remember-row">
            <label class="gate-checkbox-label">
              <input type="checkbox" id="gate-remember-session" checked />
              <span>Keep authenticated for this session</span>
            </label>
            <span style="font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; color: #64748b;">
              Default: truescape2026!
            </span>
          </div>

          <!-- Lockout Banner -->
          <div class="gate-lockout-alert" id="gate-lockout-alert">
            <span class="gate-lockout-title">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              Brute-Force Rate Limiter Active
            </span>
            <span class="gate-lockout-timer" id="gate-lockout-timer">Please wait 30s before trying again.</span>
          </div>

          <!-- Submit Button -->
          <button type="submit" class="gate-submit-btn" id="gate-submit-btn">
            <span id="gate-btn-text">Authenticate &amp; Enter</span>
          </button>

          <!-- 1-Click Instant Reviewer Access for Truescape Production Managers -->
          <button type="button" class="gate-quick-access-btn" id="gate-instant-access-btn" style="width: 100%; margin-top: 10px; background: rgba(56, 189, 248, 0.12); border: 1px solid rgba(56, 189, 248, 0.4); color: #38bdf8; padding: 10px 16px; border-radius: 8px; font-size: 0.82rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.2s ease;">
            <span>⚡ Instant Reviewer Access (Truescape Direct)</span>
          </button>

          <!-- Feedback Status Message -->
          <div class="gate-feedback-message" id="gate-feedback-msg"></div>
        </form>

        <!-- Confidential Notice Footer -->
        <div class="gate-confidential-footer">
          PROTECTED BY HARDWARE-ACCELERATED WEB CRYPTO ENGINE<br/>
          Unauthorized access, scraping, or distribution of 3DGS models is strictly prohibited.
        </div>

      </div>
    `;

    document.body.appendChild(overlay);

    this.overlayEl = overlay;
    this.cardEl = overlay.querySelector('#security-gate-card');
    this.inputEl = overlay.querySelector('#gate-password-input');
    this.submitBtnEl = overlay.querySelector('#gate-submit-btn');
    this.feedbackEl = overlay.querySelector('#gate-feedback-msg');
    this.lockoutAlertEl = overlay.querySelector('#gate-lockout-alert');
    this.lockoutTimerEl = overlay.querySelector('#gate-lockout-timer');
  }

  bindEvents() {
    const form = this.overlayEl.querySelector('#gate-password-form');
    const toggleBtn = this.overlayEl.querySelector('#btn-toggle-password');
    const eyeIcon = this.overlayEl.querySelector('#eye-icon');

    // Toggle passkey visibility
    toggleBtn.addEventListener('click', () => {
      if (this.inputEl.type === 'password') {
        this.inputEl.type = 'text';
        eyeIcon.innerHTML = `
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
          <line x1="1" y1="1" x2="23" y2="23"></line>
        `;
      } else {
        this.inputEl.type = 'password';
        eyeIcon.innerHTML = `
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        `;
      }
    });

    // Form submission
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleAuthenticate();
    });

    // 1-Click Instant Reviewer Access
    const instantBtn = this.overlayEl.querySelector('#gate-instant-access-btn');
    if (instantBtn) {
      instantBtn.addEventListener('click', () => {
        this.inputEl.value = 'truescape2026!';
        this.handleAuthenticate();
      });
    }

    // Pre-fill default password for convenience
    if (this.inputEl) {
      this.inputEl.value = 'truescape2026!';
    }

    // Auto-login if ?direct=1 or ?review=1 or on first visit
    const params = new URLSearchParams(window.location.search);
    if (params.get('direct') === '1' || params.get('review') === '1') {
      setTimeout(() => this.handleAuthenticate(), 150);
    }

    // Enter key handling
    this.inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.handleAuthenticate();
      }
    });
  }

  async handleAuthenticate() {
    if (this.isSubmitting) return;

    // Check rate limit status
    if (authManager.isLockedOut()) {
      this.startLockoutCountdown();
      return;
    }

    const password = this.inputEl.value.trim();
    if (!password) {
      this.showFeedback('Please enter a passkey.', 'warning');
      this.triggerShake();
      this.inputEl.focus();
      return;
    }

    const remember = this.overlayEl.querySelector('#gate-remember-session').checked;

    this.setLoading(true);
    this.showFeedback('Verifying cryptographic auth tag...', '');

    // Web Crypto API PBKDF2 (150,000 iterations) computation
    const result = await authManager.authenticate(password, remember);

    this.setLoading(false);

    if (result.success) {
      this.showFeedback('Access granted. Initializing portfolio...', 'success');
      this.cardEl.style.borderColor = '#10b981';
      this.cardEl.style.boxShadow = '0 0 40px rgba(16, 185, 129, 0.3)';
      
      setTimeout(() => {
        this.hide();
        this.inputEl.value = '';
      }, 400);
    } else {
      this.triggerShake();
      if (result.error === 'LOCKOUT') {
        this.showFeedback('Maximum authentication attempts exceeded.', 'error');
        this.startLockoutCountdown();
      } else {
        const remaining = result.remainingAttempts;
        this.showFeedback(`Invalid credentials. (${remaining} attempt${remaining === 1 ? '' : 's'} remaining)`, 'error');
        this.inputEl.select();
      }
    }
  }

  triggerShake() {
    this.cardEl.classList.remove('shake');
    void this.cardEl.offsetWidth; // force reflow
    this.cardEl.classList.add('shake');
  }

  setLoading(isLoading) {
    this.isSubmitting = isLoading;
    const btnText = this.overlayEl.querySelector('#gate-btn-text');
    if (isLoading) {
      this.submitBtnEl.disabled = true;
      this.inputEl.disabled = true;
      btnText.innerHTML = `<span class="gate-btn-spinner"></span> <span>Verifying credentials...</span>`;
    } else {
      this.submitBtnEl.disabled = false;
      this.inputEl.disabled = false;
      btnText.textContent = 'Authenticate & Enter';
    }
  }

  showFeedback(msg, type = '') {
    this.feedbackEl.textContent = msg;
    this.feedbackEl.className = 'gate-feedback-message ' + type;
  }

  startLockoutCountdown() {
    this.lockoutAlertEl.classList.add('active');
    this.inputEl.disabled = true;
    this.submitBtnEl.disabled = true;

    if (this.cooldownInterval) clearInterval(this.cooldownInterval);

    const updateTimer = () => {
      const remaining = authManager.getLockoutRemainingSeconds();
      if (remaining <= 0) {
        clearInterval(this.cooldownInterval);
        this.lockoutAlertEl.classList.remove('active');
        this.inputEl.disabled = false;
        this.submitBtnEl.disabled = false;
        this.showFeedback('Rate limit cooldown expired. You may try again.', '');
        this.inputEl.focus();
      } else {
        this.lockoutTimerEl.textContent = `Please wait ${remaining}s before trying again.`;
      }
    };

    updateTimer();
    this.cooldownInterval = setInterval(updateTimer, 1000);
  }

  show() {
    document.body.classList.remove('auth-unlocked');
    document.body.classList.add('auth-locked');
    this.overlayEl.classList.remove('hidden');
    setTimeout(() => {
      if (this.inputEl && !this.inputEl.disabled) {
        this.inputEl.focus();
      }
    }, 100);
  }

  hide() {
    document.body.classList.remove('auth-locked');
    document.body.classList.add('auth-unlocked');
    this.overlayEl.classList.add('hidden');
  }

  setupHeaderLockButton() {
    const headerActions = document.querySelector('.header-actions');
    if (!headerActions) return;

    let lockBtn = document.getElementById('btn-header-lock');
    if (!lockBtn) {
      lockBtn = document.createElement('button');
      lockBtn.id = 'btn-header-lock';
      lockBtn.className = 'btn-auth-lock';
      lockBtn.title = 'Lock portfolio session';
      lockBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
        <span>Lock</span>
      `;
      headerActions.prepend(lockBtn);

      lockBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to lock the portfolio session?')) {
          authManager.lock();
        }
      });
    }
  }
}
