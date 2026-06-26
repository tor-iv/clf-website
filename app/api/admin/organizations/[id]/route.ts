import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { db } from '@/lib/db';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const { slug, name, country, description } = body;

  if (typeof slug !== 'string' || slug.trim() === '') {
    return NextResponse.json({ error: 'slug is required' }, { status: 400 });
  }
  if (typeof name !== 'string' || name.trim() === '') {
    return NextResponse.json({ error: 'name is required' }, { status: 400 });
  }
  if (typeof country !== 'string' || country.trim() === '') {
    return NextResponse.json({ error: 'country is required' }, { status: 400 });
  }
  if (typeof description !== 'string' || description.trim() === '') {
    return NextResponse.json({ error: 'description is required' }, { status: 400 });
  }

  const { region, tagline, history, vision, team_members, tags, photo_url, gallery, open_collective_url, featured } = body;

  db.prepare(`
    UPDATE organizations
    SET slug=?, name=?, country=?, region=?, tagline=?, description=?,
        history=?, vision=?, team_members=?, tags=?, photo_url=?, gallery=?,
        open_collective_url=?, featured=?, updated_at=datetime('now')
    WHERE id=?
  `).run(
    slug.trim(),
    name.trim(),
    country.trim(),
    region ?? '',
    tagline ?? '',
    description.trim(),
    history ?? '',
    vision ?? '',
    JSON.stringify(team_members ?? []),
    JSON.stringify(tags ?? []),
    photo_url ?? null,
    JSON.stringify(gallery ?? []),
    open_collective_url ?? null,
    featured ? 1 : 0,
    id,
  );

  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  db.prepare('DELETE FROM organizations WHERE id=?').run(id);
  return NextResponse.json({ ok: true });
}
