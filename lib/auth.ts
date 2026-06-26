import { cookies } from 'next/headers';
import { createHmac } from 'crypto';

const SESSION_COOKIE = 'clf_admin_session';

function signedToken(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error('SESSION_SECRET is not set');
  return createHmac('sha256', secret).update('clf-admin-session').digest('base64url');
}

export async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const value = cookieStore.get(SESSION_COOKIE)?.value;
    if (!value) return false;
    return value === signedToken();
  } catch {
    return false;
  }
}

export async function setAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, signedToken(), {
    httpOnly: true,
    secure: process.env.HTTPS === 'true',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
