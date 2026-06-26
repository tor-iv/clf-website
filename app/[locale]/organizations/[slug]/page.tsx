import { queries } from '@/lib/db';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

export default async function OrgProfilePage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const org = queries.getOrgBySlug.get(slug) as any;
  if (!org) notFound();

  const team: { name: string; role: string }[] = JSON.parse(org.team_members || '[]');
  const gallery: string[] = JSON.parse(org.gallery || '[]');
  const tags: string[] = JSON.parse(org.tags || '[]');

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Back link */}
      <Link
        href={`/${locale}/organizations`}
        className="text-sm text-clf-text/50 hover:text-clf-red mb-6 block transition-colors"
      >
        ← All Organizations
      </Link>

      {/* Header */}
      <div className="mb-8">
        {org.photo_url && (
          <div className="relative h-72 rounded-2xl overflow-hidden mb-6">
            <Image src={org.photo_url} alt={org.name} fill className="object-cover" />
          </div>
        )}
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((t: string) => (
            <span
              key={t}
              className="text-xs bg-clf-amber text-clf-black px-2 py-0.5 rounded-full font-medium"
            >
              {t}
            </span>
          ))}
        </div>
        <h1 className="font-display text-4xl font-bold mb-2">{org.name}</h1>
        <p className="font-sans text-clf-text/60 mb-4">
          {org.country}
          {org.region ? `, ${org.region}` : ''}
        </p>
        {org.tagline && (
          <p className="font-sans text-xl text-clf-text/70 italic">{org.tagline}</p>
        )}
      </div>

      {/* Donate CTA */}
      <div className="bg-clf-red text-white rounded-2xl p-6 text-center mb-10">
        <h2 className="font-display text-2xl font-bold mb-2">Support {org.name}</h2>
        <p className="font-sans mb-4 opacity-90">
          Contributions go directly through Open Collective with full transparency.
        </p>
        <a
          href={org.open_collective_url || '#open-collective-link'}
          className="inline-block bg-white text-clf-red px-6 py-3 rounded-xl font-semibold hover:bg-clf-off-white transition-colors"
        >
          Fund This Organization
        </a>
      </div>

      {/* About */}
      <section className="mb-10">
        <h2 className="font-display text-2xl font-bold mb-4">About</h2>
        <div className="prose max-w-none font-sans text-clf-text">
          <ReactMarkdown>{org.description}</ReactMarkdown>
        </div>
      </section>

      {/* History */}
      {org.history && (
        <section className="mb-10">
          <h2 className="font-display text-2xl font-bold mb-4">Our History</h2>
          <div className="prose max-w-none font-sans text-clf-text">
            <ReactMarkdown>{org.history}</ReactMarkdown>
          </div>
        </section>
      )}

      {/* Vision */}
      {org.vision && (
        <section className="mb-10">
          <h2 className="font-display text-2xl font-bold mb-4">Our Vision</h2>
          <div className="prose max-w-none font-sans text-clf-text">
            <ReactMarkdown>{org.vision}</ReactMarkdown>
          </div>
        </section>
      )}

      {/* Team */}
      {team.length > 0 && (
        <section className="mb-10">
          <h2 className="font-display text-2xl font-bold mb-4">Our People</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {team.map((m) => (
              <div
                key={m.name}
                className="text-center p-4 border border-clf-warm-gray rounded-xl"
              >
                <div className="w-14 h-14 rounded-full bg-clf-warm-gray mx-auto mb-2" />
                <div className="font-display font-semibold text-sm">{m.name}</div>
                <div className="font-sans text-xs text-clf-text/50">{m.role}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Gallery */}
      {gallery.length > 0 && (
        <section className="mb-10">
          <h2 className="font-display text-2xl font-bold mb-4">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {gallery.map((url, i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden">
                <Image
                  src={url}
                  alt=""
                  fill
                  className="object-cover hover:scale-105 transition-transform"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
