import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('about');
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <p className="text-xs tracking-[0.3em] uppercase text-clf-text/50 border-l-[3px] border-clf-red pl-3 mb-6">
        About CLF
      </p>
      <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">{t('title')}</h1>
      <p className="font-sans text-xl text-clf-text/60 mb-12">
        Our mission is to empower caregivers by mobilizing flexible and transparent funding to caregiver associations globally, bridging the gap between supranational fiscal donors and community health actors on the ground, enabling locally-led, grassroots solutions that advance equitable health systems worldwide.
      </p>

      <h2 className="font-display text-3xl font-bold mb-4 text-clf-red">{t('problemTitle')}</h2>
      <div className="font-sans prose prose-lg max-w-none mb-12 text-clf-text">
        <p className="mb-4">
          Across the world, caregivers—including but not limited to Community Health Workers (CHWs), promoters, auxiliaries, midwives, and other frontline care providers—are organizing through mutual aid networks, associations, and grassroots systems of care to build healthier and more resilient futures. These caregivers are often the first and last line of support in their communities, providing essential services, emotional care, and continuity across fragile health systems.
        </p>
        <p className="mb-4">
          Despite their critical role, global health and philanthropic funding systems remain highly concentrated and structurally misaligned with frontline realities. A disproportionate share of resources flows through a small group of international organizations and contractors rather than directly to local actors. As funding passes through multiple administrative layers, it is diluted by overhead costs, fragmented across institutions, and delayed by bureaucratic requirements.
        </p>
        <p>
          For caregivers on the ground, this results in: limited access to flexible, direct funding; difficulty coordinating and building collective power; economic instability and burnout; and missed opportunities to scale locally rooted solutions.
        </p>
      </div>

      <h2 className="font-display text-3xl font-bold mb-6 text-clf-red">{t('tocTitle')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            step: '1',
            title: 'Mobilize',
            desc: 'We mobilize capital, tools, and relationships to directly fund organized groups of caregivers and build their capacity.',
          },
          {
            step: '2',
            title: 'Strengthen',
            desc: 'Caregiver networks receive flexible, direct fiscal and institutional support that helps them build strong organizations and coalitions.',
          },
          {
            step: '3',
            title: 'Transform',
            desc: 'Caregivers become more stable, better coordinated, and more empowered. Funders adopt more direct, trust-based, locally led funding models.',
          },
        ].map((s) => (
          <div key={s.step} className="border border-clf-warm-gray rounded-xl p-6">
            <div className="w-10 h-10 bg-clf-red text-white rounded-full flex items-center justify-center font-bold mb-3">
              {s.step}
            </div>
            <h3 className="font-display font-bold text-lg mb-2">{s.title}</h3>
            <p className="font-sans text-clf-text/70 text-sm">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
