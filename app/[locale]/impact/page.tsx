import Image from 'next/image';
import { evidenceStats } from '@/lib/evidence-stats';

export default function ImpactPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <p className="text-xs tracking-[0.3em] uppercase text-clf-text/50 border-l-[3px] border-clf-red pl-3 mb-6">
        The Evidence
      </p>
      <h1 className="font-display text-5xl font-bold mb-4">The Evidence Base</h1>
      <p className="font-sans text-xl text-clf-text/60 mb-12">
        Research supporting direct, flexible funding to community health workers.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
        <div className="md:col-span-2">
          <div className="bg-clf-off-white border border-clf-warm-gray rounded-2xl p-8">
            <h2 className="font-display text-2xl font-bold mb-4">Why Direct Funding Matters</h2>
            <p className="font-sans text-clf-text/70 mb-4">
              The global flow of philanthropic and health funding is not reaching the local caregivers who are best positioned to deliver care, sustain communities, and drive lasting change. Addressing this imbalance requires shifting resources away from intermediary-heavy models toward direct, trust-based investment in organized caregiver networks.
            </p>
            <p className="font-sans text-clf-text/70">
              Cash transfer research consistently shows that direct, flexible funding with minimal restrictions leads to better outcomes, greater dignity, and longer-lasting impact than in-kind or restricted grants.
            </p>
          </div>
        </div>
        <div className="relative rounded-2xl overflow-hidden hidden md:block min-h-[320px]">
          <Image
            src="/images/impact-rural-village.jpg"
            alt="A community CLF works alongside"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {evidenceStats.map((s) => (
          <div key={s.label} className="border border-clf-warm-gray rounded-2xl overflow-hidden bg-white">
            <div className="flex">
              <div className="w-[3px] bg-clf-red flex-shrink-0" />
              <div className="p-6 flex-1">
                <div className="font-display text-4xl font-extrabold text-clf-red mb-2">{s.value}</div>
                <div className="font-sans font-semibold text-clf-text mb-1">{s.label}</div>
                {s.url ? (
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-clf-text/40 hover:text-clf-red underline underline-offset-2"
                  >
                    {s.source}
                  </a>
                ) : (
                  <div className="text-xs text-clf-text/40">{s.source}</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
