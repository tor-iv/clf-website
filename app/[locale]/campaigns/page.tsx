import { queries } from '@/lib/db';
import { CampaignCard } from '@/components/CampaignCard';

export default function CampaignsPage() {
  const campaigns = queries.getAllCampaigns.all() as any[];
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <p className="text-xs tracking-[0.3em] uppercase text-clf-text/50 border-l-[3px] border-clf-red pl-3 mb-6">
        Our Initiatives
      </p>
      <h1 className="font-display text-5xl font-bold mb-4">Campaigns</h1>
      <p className="font-sans text-xl text-clf-text/60 mb-12">
        Issue-specific initiatives led by caregiver associations.
      </p>
      {campaigns.length === 0 ? (
        <div className="text-center py-20 text-clf-text/40">
          <p className="text-lg">Campaigns coming soon.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {campaigns.map((c) => (
            <CampaignCard key={c.slug} c={c} />
          ))}
        </div>
      )}
    </div>
  );
}
