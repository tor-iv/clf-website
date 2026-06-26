const research = [
  { stat: '$3–$10', label: 'ROI per dollar invested', source: 'WHO, 2019' },
  { stat: '1B+', label: 'People who could benefit from CHW scale-up', source: 'Lancet Commission, 2018' },
  { stat: '45%', label: 'Reduction in child mortality with trained CHWs', source: 'UNICEF' },
  { stat: '<5%', label: 'of global health funding directly reaches local actors', source: 'OECD DAC, 2022' },
  { stat: '$3.3B/yr', label: 'Estimated cost to fully support CHW workforce', source: 'One Million CHW Campaign' },
  { stat: '70%', label: 'of health outcomes shaped by social determinants', source: 'WHO CSDH' },
];

export default function ImpactPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <p className="text-xs tracking-[0.3em] uppercase text-clf-text/50 border-l-[3px] border-clf-red pl-3 mb-6">
        The Evidence
      </p>
      <h1 className="font-display text-5xl font-bold mb-4">The Evidence Base</h1>
      <p className="font-sans text-xl text-clf-text/60 mb-12">
        Research supporting direct, flexible funding to community health workers.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {research.map((r) => (
          <div key={r.stat} className="border border-clf-warm-gray rounded-2xl overflow-hidden bg-white">
            <div className="flex">
              <div className="w-[3px] bg-clf-red flex-shrink-0" />
              <div className="p-6 flex-1">
                <div className="font-display text-4xl font-extrabold text-clf-red mb-2">{r.stat}</div>
                <div className="font-sans font-semibold text-clf-text mb-1">{r.label}</div>
                <div className="text-xs text-clf-text/40">{r.source}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
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
  );
}
