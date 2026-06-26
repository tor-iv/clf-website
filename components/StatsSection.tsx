const stats = [
  { value: '1M+', label: 'Community Health Workers globally' },
  { value: '$3–$10', label: 'ROI per dollar invested in CHWs' },
  { value: '70%', label: 'of health outcomes influenced by social determinants' },
  { value: '<5%', label: 'of global health funding reaches local actors directly' },
];

export function StatsSection({ title }: { title: string }) {
  return (
    <section className="bg-clf-black text-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Eyebrow with signature line */}
        <p className="text-xs tracking-[0.3em] uppercase text-clf-warm-gray border-l-[3px] border-clf-red pl-3 mb-4">Evidence</p>
        <h2 className="font-display text-4xl md:text-5xl font-extrabold mb-16">{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(s => (
            <div key={s.value} className="border-l-[3px] border-clf-red pl-4">
              <div className="font-display text-5xl font-extrabold text-clf-red leading-none mb-2">{s.value}</div>
              <div className="text-clf-warm-gray text-sm leading-snug">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
