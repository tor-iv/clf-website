export default function WhatWeDoPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <p className="text-xs tracking-[0.3em] uppercase text-clf-text/50 border-l-[3px] border-clf-red pl-3 mb-6">
        Our Work
      </p>
      <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">What We Do</h1>
      <p className="font-sans text-xl text-clf-text/60 mb-12">
        Our primary initiative is a subgranting platform designed to facilitate fiscal sponsorship of organized bodies of caregivers.
      </p>

      <div className="space-y-12">
        {[
          {
            title: 'Subgranting Platform',
            desc: 'A dedicated website where organized bodies can create profiles describing their story, work, priorities, and fiscal needs. Funding is mobilized through both public crowdfunding and targeted outreach to grants, foundations, and trusts.',
          },
          {
            title: 'Direct Funding via Open Collective',
            desc: 'Funds are disbursed through our fiscal host, Open Collective, linked within each profile to ensure full transparency. Donors can see how their contributions are allocated and what administrative percentages apply.',
          },
          {
            title: 'Flexible, Purpose-Aligned Transfers',
            desc: 'Donations function primarily as flexible, purpose-aligned monetary transfers under the autonomy of organized bodies of caregivers. Organizations may use funds for organizing, health implementation, and personal needs related to their work activities.',
          },
          {
            title: 'Capacity Building',
            desc: 'The platform helps support governance and financial infrastructure, strengthen fundraising readiness, and expand storytelling and reporting capacity to demonstrate impact and attract sustained support.',
          },
        ].map((a) => (
          <div key={a.title} className="flex gap-6">
            <div className="w-1 bg-clf-red rounded-full flex-shrink-0" />
            <div>
              <h2 className="font-display text-2xl font-bold mb-2">{a.title}</h2>
              <p className="font-sans text-clf-text/70">{a.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
