import { useTranslations } from 'next-intl';
import { VideoEmbed } from '@/components/VideoEmbed';
import { StatsSection } from '@/components/StatsSection';
import Link from 'next/link';
import Image from 'next/image';
import { queries } from '@/lib/db';

export default function HomePage() {
  const t = useTranslations('home');
  const featuredOrgs = queries.getFeaturedOrgs.all() as any[];

  return (
    <>
      {/* Hero — full viewport, photo bg, text-dominant with "Heart" in red */}
      <section className="relative min-h-screen flex items-end pb-16 md:pb-24 bg-clf-black text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.jpg"
            alt=""
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 w-full">
          <p className="font-sans text-xs tracking-[0.3em] uppercase text-clf-warm-gray mb-6 border-l-[3px] border-clf-red pl-3">
            Caregiver Liberation Fund
          </p>
          {/* "Resourcing the Heart of Community Health" — "Heart" oversized in red */}
          <h1 className="font-display font-extrabold leading-none mb-8">
            <span className="block text-4xl md:text-6xl text-white/80">Resourcing the</span>
            <span className="block text-7xl md:text-[10rem] text-clf-red leading-none -ml-1">Heart</span>
            <span className="block text-4xl md:text-6xl text-white/80">of Community Health</span>
          </h1>
          <p className="text-clf-warm-gray text-lg md:text-xl max-w-xl mb-10">{t('heroSub')}</p>
          <Link
            href="#open-collective-link"
            className="inline-block bg-clf-red text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-clf-red/80 transition-colors"
          >
            {t('cta')}
          </Link>
        </div>
      </section>

      {/* Stats */}
      <StatsSection title={t('statsTitle')} />

      {/* Featured Orgs */}
      {featuredOrgs.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-20 md:py-28">
          <p className="text-xs tracking-[0.3em] uppercase text-clf-warm-gray border-l-[3px] border-clf-red pl-3 mb-4">
            Who We Support
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold mb-12 text-clf-black">
            {t('orgTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredOrgs.map((org) => {
              const tags: string[] = (() => {
                try { return JSON.parse(org.tags ?? '[]'); } catch { return []; }
              })();
              return (
                <Link
                  key={org.slug}
                  href={`/en/organizations/${org.slug}`}
                  className="flex rounded-2xl border border-clf-warm-gray bg-white overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  {/* Red left sidebar */}
                  <div className="w-[3px] flex-shrink-0 bg-clf-red" />
                  <div className="flex flex-col flex-1 p-5">
                    {org.photo_url && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={org.photo_url}
                        alt={org.name}
                        className="w-full h-40 object-cover rounded-lg mb-4"
                      />
                    )}
                    <h3 className="font-display font-bold text-lg text-clf-black group-hover:text-clf-red transition-colors mb-1">
                      {org.name}
                    </h3>
                    <p className="text-clf-text/60 text-sm mb-2">{org.country}</p>
                    {org.tagline && (
                      <p className="text-clf-text text-sm line-clamp-3 mb-4">{org.tagline}</p>
                    )}
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {tags.slice(0, 3).map((tag: string) => (
                          <span
                            key={tag}
                            className="bg-clf-amber text-clf-black text-xs px-2 py-0.5 rounded-full font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Videos */}
      <section className="bg-clf-warm-gray py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <p className="text-xs tracking-[0.3em] uppercase text-clf-text/50 border-l-[3px] border-clf-red pl-3 mb-4">
            Learn More
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold mb-12 text-clf-black">
            {t('videoTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <VideoEmbed videoId="xvztjulLIJM" title="What Do Community Health Workers Do?" />
              <p className="text-center text-sm text-clf-text/60 mt-3">What Do Community Health Workers Do?</p>
            </div>
            <div>
              <VideoEmbed videoId="V0VEa9J5hpQ" title="Community Health Workers in CES" />
              <p className="text-center text-sm text-clf-text/60 mt-3">CHWs in Community-Engaged Settings</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
