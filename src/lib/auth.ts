import { cookies } from 'next/headers';
import { createHmac, timingSafeEqual } from 'node:crypto';
export { hashPassword, verifyPassword } from '@/lib/passwords';

const SESSION_COOKIE = 'travel_colombia_session';
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7;

function getSessionSecret(): string {
  const secret = process.env.AUTH_SESSION_SECRET;
  if (!secret || Buffer.byteLength(secret) < 32) {
    throw new Error('AUTH_SESSION_SECRET must contain at least 32 bytes.');
  }
  return secret;
}

function sign(value: string): Buffer {
  return createHmac('sha256', getSessionSecret()).update(value).digest();
}

export async function setAuthSession(userId: string): Promise<void> {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS;
  const payload = Buffer.from(JSON.stringify({ userId, expiresAt })).toString('base64url');
  const token = `${payload}.${sign(payload).toString('base64url')}`;
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_DURATION_SECONDS,
  });
}

export async function getAuthUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const [payload, signature, extra] = token.split('.');
  if (!payload || !signature || extra) return null;

  try {
    const expectedSignature = sign(payload);
    const actualSignature = Buffer.from(signature, 'base64url');
    if (
      actualSignature.length !== expectedSignature.length ||
      !timingSafeEqual(actualSignature, expectedSignature)
    ) {
      return null;
    }

    const session = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as {
      userId?: unknown;
      expiresAt?: unknown;
    };
    if (
      typeof session.userId !== 'string' ||
      typeof session.expiresAt !== 'number' ||
      session.expiresAt <= Math.floor(Date.now() / 1000)
    ) {
      return null;
    }

    return session.userId;
  } catch {
    return null;
  }
}

export async function clearAuthSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}