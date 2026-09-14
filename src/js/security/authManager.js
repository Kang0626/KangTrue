/**
 * Authentication & Session Manager
 * Manages login state, brute-force rate-limiting, and auto-lock mechanisms.
 */
import { VAULT_CONFIG } from './authConfig.js';
import { verifyVaultPassword } from './cryptoVault.js';

class SecurityAuthManager {
  constructor() {
    this._failedAttempts = 0;
    this._lockoutUntil = 0;
    this._listeners = new Set();
    this._inactivityTimer = null;
    this._inactivityTimeoutMs = 30 * 60 * 1000; // 30-minute auto-lock on inactivity

    this._initInactivityTracking();
  }

  /**
   * Register event listener ('unlocked' | 'locked')
   */
  on(event, callback) {
    this._listeners.add({ event, callback });
    return () => this.off(event, callback);
  }

  off(event, callback) {
    for (const item of this._listeners) {
      if (item.event === event && item.callback === callback) {
        this._listeners.delete(item);
      }
    }
  }

  _emit(event, data) {
    for (const item of this._listeners) {
      if (item.event === event) {
        try {
          item.callback(data);
        } catch (e) {
          console.error(`[AuthManager] Error in listener for ${event}:`, e);
        }
      }
    }
  }

  /**
   * Check if current browser session is authenticated
   */
  isAuthenticated() {
    try {
      const raw = sessionStorage.getItem(VAULT_CONFIG.sessionStorageKey);
      if (!raw) return false;
      const data = JSON.parse(raw);
      if (!data || !data.token || !data.expiresAt) return false;

      // Check session expiration
      if (Date.now() > data.expiresAt) {
        this.lock();
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Check if brute-force lockout is currently active
   */
  isLockedOut() {
    const now = Date.now();
    return now < this._lockoutUntil;
  }

  /**
   * Get remaining lockout seconds
   */
  getLockoutRemainingSeconds() {
    const diff = this._lockoutUntil - Date.now();
    return diff > 0 ? Math.ceil(diff / 1000) : 0;
  }

  /**
   * Attempt passkey authentication
   * @param {string} password 
   * @param {boolean} rememberSession 
   */
  async authenticate(password, rememberSession = true) {
    if (this.isLockedOut()) {
      return {
        success: false,
        error: 'LOCKOUT',
        remainingSeconds: this.getLockoutRemainingSeconds()
      };
    }

    const verifyResult = await verifyVaultPassword(password);

    if (verifyResult.success) {
      // Authentication succeeded -> Reset failure count
      this._failedAttempts = 0;
      this._lockoutUntil = 0;

      if (rememberSession) {
        const expiresAt = Date.now() + (VAULT_CONFIG.sessionExpiryMinutes * 60 * 1000);
        const sessionData = {
          token: 'auth_' + Math.random().toString(36).substring(2),
          expiresAt,
          role: verifyResult.payload?.role || 'reviewer'
        };
        sessionStorage.setItem(VAULT_CONFIG.sessionStorageKey, JSON.stringify(sessionData));
      }

      this._resetInactivityTimer();
      this._emit('unlocked', { payload: verifyResult.payload });
      return { success: true };
    } else {
      // Authentication failed
      this._failedAttempts += 1;

      if (this._failedAttempts >= VAULT_CONFIG.maxFailedAttempts) {
        this._lockoutUntil = Date.now() + VAULT_CONFIG.lockoutDurationMs;
        const remainingSeconds = Math.ceil(VAULT_CONFIG.lockoutDurationMs / 1000);
        return {
          success: false,
          error: 'LOCKOUT',
          remainingSeconds,
          attempts: this._failedAttempts
        };
      }

      return {
        success: false,
        error: 'INVALID',
        attempts: this._failedAttempts,
        remainingAttempts: VAULT_CONFIG.maxFailedAttempts - this._failedAttempts
      };
    }
  }

  /**
   * Lock portfolio session immediately
   */
  lock() {
    try {
      sessionStorage.removeItem(VAULT_CONFIG.sessionStorageKey);
    } catch (e) {}

    if (this._inactivityTimer) {
      clearTimeout(this._inactivityTimer);
      this._inactivityTimer = null;
    }

    this._emit('locked');
  }

  _initInactivityTracking() {
    const handleActivity = () => {
      if (this.isAuthenticated()) {
        this._resetInactivityTimer();
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleActivity, { passive: true });
      window.addEventListener('keydown', handleActivity, { passive: true });
      window.addEventListener('touchstart', handleActivity, { passive: true });
    }
  }

  _resetInactivityTimer() {
    if (this._inactivityTimer) {
      clearTimeout(this._inactivityTimer);
    }
    this._inactivityTimer = setTimeout(() => {
      console.warn('[Security] Inactivity timeout reached. Automatically locking portfolio.');
      this.lock();
    }, this._inactivityTimeoutMs);
  }
}

export const authManager = new SecurityAuthManager();
