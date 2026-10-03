import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';

const PASSWORD_KEY_LENGTH = 64;
const PASSWORD_COST = 32768;

function deriveKey(password: string, salt: Buffer): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scryptCallback(
      password,
      salt,
      PASSWORD_KEY_LENGTH,
      { N: PASSWORD_COST, r: 8, p: 1, maxmem: 64 * 1024 * 1024 },
      (error, derivedKey) => {
        if (error) reject(error);
        else resolve(derivedKey);
      }
    );
  });
}

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const key = await deriveKey(password, salt);
  return `scrypt$${PASSWORD_COST}$${salt.toString('base64url')}$${key.toString('base64url')}`;
}

export async function verifyPassword(password: string, storedValue: unknown): Promise<boolean> {
  if (typeof storedValue !== 'string') return false;

  if (!storedValue.startsWith('scrypt$')) {
    const candidate = Buffer.from(password);
    const stored = Buffer.from(storedValue);
    return candidate.length === stored.length && timingSafeEqual(candidate, stored);
  }

  const [, cost, saltValue, keyValue] = storedValue.split('$');
  const salt = Buffer.from(saltValue || '', 'base64url');
  const expectedKey = Buffer.from(keyValue || '', 'base64url');
  if (Number(cost) !== PASSWORD_COST || salt.length !== 16 || expectedKey.length !== PASSWORD_KEY_LENGTH) {
    return false;
  }

  const actualKey = await deriveKey(password, salt);
  return timingSafeEqual(actualKey, expectedKey);
}