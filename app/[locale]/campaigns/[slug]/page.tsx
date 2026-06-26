import { notFound } from 'next/navigation';
import Link from 'next/link';
import { queries } from '@/lib/db';

export default async function CampaignDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const campaign = queries.getCampaignBySlug.get(slug) as any;
  if (!campaign) notFound();

  const statusColors =
    campaign.status === 'active'
      ? 'bg-clf-red/10 text-clf-red'
      : campaign.status === 'completed'
        ? 'bg-clf-warm-gray text-clf-text/50'
        : 'bg-clf-black/10 text-clf-black';

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <Link
        href={`/${locale}/campaigns`}
        className="text-xs tracking-[0.3em] uppercase text-clf-text/50 hover:text-clf-red transition-colors mb-6 inline-block"
      >
        Back to Campaigns
      </Link>
      <div className="flex items-center gap-3 mb-4">
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColors}`}>
          {campaign.status}
        </span>
        {campaign.start_date && (
          <span className="text-xs text-clf-text/40">{campaign.start_date}</span>
        )}
      </div>
      <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">{campaign.title}</h1>
      {campaign.org_name && (
        <p className="font-sans text-clf-red font-semibold mb-6">{campaign.org_name}</p>
      )}
      {campaign.description && (
        <p className="font-sans text-clf-text/70 text-lg leading-relaxed">{campaign.description}</p>
      )}
    </div>
  );
}
