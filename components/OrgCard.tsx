import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';

type Org = {
  slug: string;
  name: string;
  country: string;
  tagline: string;
  photo_url: string | null;
  tags: string;
};

export function OrgCard({ org }: { org: Org }) {
  const locale = useLocale();
  const tags: string[] = JSON.parse(org.tags || '[]');
  return (
    <Link
      href={`/${locale}/organizations/${org.slug}`}
      className="group block border border-clf-warm-gray rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 bg-white"
    >
      <div className="relative h-52 bg-clf-warm-gray">
        {org.photo_url ? (
          <Image
            src={org.photo_url}
            alt={org.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-clf-black flex items-center justify-center">
            <span className="font-display text-5xl font-extrabold text-white/20">
              {org.name[0]}
            </span>
          </div>
        )}
      </div>
      {/* Signature red line + card content */}
      <div className="flex">
        <div className="w-[3px] bg-clf-red flex-shrink-0" />
        <div className="p-5 flex-1">
          <div className="flex flex-wrap gap-1 mb-3">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs bg-clf-amber text-clf-black px-2 py-0.5 rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="font-display font-bold text-lg mb-1 group-hover:text-clf-red transition-colors leading-tight">
            {org.name}
          </h3>
          <p className="text-xs tracking-widest uppercase text-clf-text/50 mb-2">
            {org.country}
          </p>
          <p className="text-sm text-clf-text/70 line-clamp-2 leading-relaxed">
            {org.tagline}
          </p>
        </div>
      </div>
    </Link>
  );
}
