import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'crypto';
import { setAdminSession, clearAdminSession } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const expected = process.env.ADMIN_PASSWORD;
  // Fail-closed: if ADMIN_PASSWORD is unset, deny all logins rather than
  // accidentally granting access to anyone who sends an empty password.
  if (!expected) {
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
  }
  const pwBuf = Buffer.from(typeof password === 'string' ? password : '');
  const exBuf = Buffer.from(expected);
  // timingSafeEqual requires equal-length buffers; unequal length is already
  // a mismatch so we reject early without leaking which side is longer.
  const match = pwBuf.length === exBuf.length && timingSafeEqual(pwBuf, exBuf);
  if (!match) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }
  await setAdminSession();
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  await clearAdminSession();
  return NextResponse.json({ ok: true });
}
