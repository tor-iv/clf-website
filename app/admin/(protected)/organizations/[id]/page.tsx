import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { OrgForm } from '@/components/admin/OrgForm';

type Org = {
  id: number;
  slug: string;
  name: string;
  country: string;
  region: string;
  tagline: string;
  description: string;
  history: string;
  vision: string;
  open_collective_url: string | null;
  featured: number;
  tags: string;
  photo_url: string | null;
};

export default async function EditOrgPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const org = db.prepare('SELECT * FROM organizations WHERE id=?').get(id) as Org | undefined;
  if (!org) notFound();

  const initial = {
    slug: org.slug,
    name: org.name,
    country: org.country,
    region: org.region ?? '',
    tagline: org.tagline ?? '',
    description: org.description,
    history: org.history ?? '',
    vision: org.vision ?? '',
    open_collective_url: org.open_collective_url ?? '',
    featured: org.featured === 1,
    tags: (() => {
      try {
        return (JSON.parse(org.tags) as string[]).join(', ');
      } catch {
        return '';
      }
    })(),
    photo_url: org.photo_url ?? '',
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/organizations" className="text-clf-text hover:text-clf-black text-sm">
          ← Organizations
        </Link>
        <span className="text-clf-warm-gray">/</span>
        <h1 className="font-display text-2xl font-bold text-clf-black">Edit: {org.name}</h1>
      </div>
      <div className="bg-white rounded-xl border border-clf-warm-gray p-6">
        <OrgForm initial={initial} orgId={org.id} />
      </div>
    </div>
  );
}
