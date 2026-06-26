import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { slug, title, description } = body;

  if (typeof slug !== 'string' || slug.trim() === '') {
    return NextResponse.json({ error: 'slug is required' }, { status: 400 });
  }
  if (typeof title !== 'string' || title.trim() === '') {
    return NextResponse.json({ error: 'title is required' }, { status: 400 });
  }
  if (typeof description !== 'string' || description.trim() === '') {
    return NextResponse.json({ error: 'description is required' }, { status: 400 });
  }

  const { start_date, end_date, goal_amount, org_id, status } = body;

  const stmt = db.prepare(`
    INSERT INTO campaigns (slug, title, description, start_date, end_date, goal_amount, org_id, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    slug.trim(),
    title.trim(),
    description.trim(),
    start_date ?? null,
    end_date ?? null,
    goal_amount ?? null,
    org_id ?? null,
    status ?? 'upcoming',
  );

  return NextResponse.json({ id: result.lastInsertRowid });
}
