/**
 * Security Vault Configuration
 * Web Crypto API (PBKDF2-SHA256 + AES-GCM 256-bit)
 * 
 * Default Password: truescape2026!
 * (To change the password, execute generateNewVaultConfig() in the browser console)
 */

export const VAULT_CONFIG = {
  // Cryptographic key derivation parameters
  iterations: 150000,
  hashAlgorithm: 'SHA-256',
  
  // Encrypted authentication credentials (Base64)
  salt: 'jWCbG+NkQphZNXg/RZNQrQ==',
  iv: 'jGDLKbnP8N0Uq3OS',
  ciphertext: 'lUB9m9gR8gnJ2opr3h9D00wVhppsCc5ylJXGKpugSoGQ9I1yMN3uD0UiFREPp8UNwC2iv1jgkWmfNclSOiAFHQmgew1G6vFxh6/dFvAl1ihpHtg=',
  
  // Security policy
  maxFailedAttempts: 5,
  lockoutDurationMs: 30000, // 30s lockout cooldown
  sessionStorageKey: 'truescape_vault_session',
  sessionExpiryMinutes: 60, // 60-minute session validity
};

/**
 * Utility helper to generate new vault credentials from browser console
 * Example: await window.generateNewVaultConfig('NewPasskey123!')
 */
export async function generateNewVaultConfig(newPassword) {
  const enc = new TextEncoder();
  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    enc.encode(newPassword),
    'PBKDF2',
    false,
    ['deriveKey']
  );
  
  const key = await window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: VAULT_CONFIG.iterations,
      hash: VAULT_CONFIG.hashAlgorithm
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
  
  const payload = JSON.stringify({
    authorized: true,
    role: 'authorized_reviewer',
    createdAt: new Date().toISOString()
  });
  
  const encrypted = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: iv },
    key,
    enc.encode(payload)
  );
  
  const toBase64 = (arr) => btoa(String.fromCharCode(...new Uint8Array(arr)));
  
  const result = {
    salt: toBase64(salt),
    iv: toBase64(iv),
    ciphertext: toBase64(encrypted),
    iterations: VAULT_CONFIG.iterations
  };
  
  console.log('--- New Passkey Vault Configuration ---');
  console.log(JSON.stringify(result, null, 2));
  console.log('Copy and paste the salt, iv, and ciphertext into src/js/security/authConfig.js to apply.');
  return result;
}

// Register global helper
if (typeof window !== 'undefined') {
  window.generateNewVaultConfig = generateNewVaultConfig;
}
