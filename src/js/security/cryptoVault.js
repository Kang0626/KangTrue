/**
 * Web Crypto API Security Vault Engine
 * Implements PBKDF2-SHA256 (150,000 iterations) + AES-GCM 256-bit
 */
import { VAULT_CONFIG } from './authConfig.js';

// Base64 helper functions
function base64ToUint8Array(base64) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

/**
 * Mathematically verifies user-entered passkey using Web Crypto API.
 * Never performs plaintext string comparison; verification is proven solely
 * by AES-GCM authentication tag validity during decryption.
 * 
 * @param {string} enteredPassword 
 * @returns {Promise<{ success: boolean, payload?: any, error?: string }>}
 */
export async function verifyVaultPassword(enteredPassword) {
  if (!enteredPassword || typeof enteredPassword !== 'string') {
    return { success: false, error: 'EMPTY_PASSWORD' };
  }

  if (!window.crypto || !window.crypto.subtle) {
    console.error('[SecurityVault] Web Crypto API is not supported in this browser environment.');
    return { success: false, error: 'CRYPTO_UNSUPPORTED' };
  }

  try {
    const enc = new TextEncoder();
    const dec = new TextDecoder();
    
    const salt = base64ToUint8Array(VAULT_CONFIG.salt);
    const iv = base64ToUint8Array(VAULT_CONFIG.iv);
    const ciphertext = base64ToUint8Array(VAULT_CONFIG.ciphertext);

    // 1. Import raw passkey as key material
    const keyMaterial = await window.crypto.subtle.importKey(
      'raw',
      enc.encode(enteredPassword),
      'PBKDF2',
      false,
      ['deriveKey']
    );

    // 2. Derive 256-bit AES-GCM key with PBKDF2 (150,000 iterations)
    const derivedKey = await window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: VAULT_CONFIG.iterations,
        hash: VAULT_CONFIG.hashAlgorithm
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false, // non-extractable
      ['decrypt']
    );

    // 3. AES-GCM decryption (automatic authentication tag verification)
    const decryptedBuffer = await window.crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: iv },
      derivedKey,
      ciphertext
    );

    // 4. Parse payload upon successful decryption
    const decryptedText = dec.decode(decryptedBuffer);
    const payload = JSON.parse(decryptedText);

    return {
      success: true,
      payload
    };
  } catch (err) {
    // Auth tag mismatch or corrupted ciphertext -> Invalid credentials
    return {
      success: false,
      error: 'INVALID_CREDENTIALS'
    };
  }
}
