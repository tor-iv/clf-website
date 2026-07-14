import { NextRequest, NextResponse } from 'next/server';
import { queries } from '@/lib/db';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { orgName, contactName, email, country, website, description } = body;

  if (typeof orgName !== 'string' || orgName.trim() === '') {
    return NextResponse.json({ error: 'Organization name is required' }, { status: 400 });
  }
  if (typeof contactName !== 'string' || contactName.trim() === '') {
    return NextResponse.json({ error: 'Contact name is required' }, { status: 400 });
  }
  if (typeof email !== 'string' || email.trim() === '' || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
  }
  if (typeof country !== 'string' || country.trim() === '') {
    return NextResponse.json({ error: 'Country is required' }, { status: 400 });
  }
  if (typeof description !== 'string' || description.trim() === '') {
    return NextResponse.json({ error: 'Description is required' }, { status: 400 });
  }

  const site = typeof website === 'string' ? website.trim() : '';
  queries.createPartnerApplication.run(
    orgName.trim(),
    contactName.trim(),
    email.trim(),
    country.trim(),
    site,
    description.trim()
  );
  return NextResponse.json({ ok: true });
}
