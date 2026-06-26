import Link from 'next/link';
import { useLocale } from 'next-intl';

type Campaign = {
  slug: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  status: string;
  org_name?: string;
};

const statusColors: Record<string, string> = {
  active: 'bg-clf-red/10 text-clf-red',
  upcoming: 'bg-clf-black/10 text-clf-black',
  completed: 'bg-clf-warm-gray text-clf-text/50',
};

export function CampaignCard({ c }: { c: Campaign }) {
  const locale = useLocale();
  return (
    <Link
      href={`/${locale}/campaigns/${c.slug}`}
      className="block border border-clf-warm-gray rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 bg-white"
    >
      <div className="flex">
        <div className="w-[3px] bg-clf-red flex-shrink-0" />
        <div className="p-5 flex-1">
          <div className="flex items-start justify-between mb-3">
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColors[c.status] ?? statusColors.upcoming}`}
            >
              {c.status}
            </span>
            {c.start_date && (
              <span className="text-xs text-clf-text/40">{c.start_date}</span>
            )}
          </div>
          <h3 className="font-display font-bold text-lg mb-1">{c.title}</h3>
          {c.org_name && (
            <p className="text-sm text-clf-red mb-2">{c.org_name}</p>
          )}
          <p className="text-sm text-clf-text/70 line-clamp-2">{c.description}</p>
        </div>
      </div>
    </Link>
  );
}
