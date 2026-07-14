import { evidenceStats } from '@/lib/evidence-stats';

export function StatsSection({ title }: { title: string }) {
  return (
    <section className="bg-clf-black text-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Eyebrow with signature line */}
        <p className="text-xs tracking-[0.3em] uppercase text-clf-warm-gray border-l-[3px] border-clf-red pl-3 mb-4">Evidence</p>
        <h2 className="font-display text-4xl md:text-5xl font-extrabold mb-16">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {evidenceStats.map(s => (
            <div key={s.label} className="border-l-[3px] border-clf-red pl-4">
              <div className="font-display text-4xl md:text-5xl font-extrabold text-clf-red leading-none mb-2">{s.value}</div>
              <div className="text-clf-warm-gray text-sm leading-snug mb-2">{s.label}</div>
              {s.url ? (
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-clf-warm-gray/50 hover:text-clf-warm-gray underline underline-offset-2"
                >
                  {s.source}
                </a>
              ) : (
                <div className="text-xs text-clf-warm-gray/50">{s.source}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
