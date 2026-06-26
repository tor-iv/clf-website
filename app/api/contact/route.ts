import { NextRequest, NextResponse } from 'next/server';
import { queries } from '@/lib/db';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, organization, message } = body;

  if (typeof name !== 'string' || name.trim() === '') {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  }
  if (typeof email !== 'string' || email.trim() === '' || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
  }
  if (typeof message !== 'string' || message.trim() === '') {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 });
  }

  const org = typeof organization === 'string' ? organization.trim() : '';
  queries.createContact.run(name.trim(), email.trim(), org, message.trim());
  return NextResponse.json({ ok: true });
}
