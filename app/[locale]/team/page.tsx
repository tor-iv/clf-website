const team = [
  {
    name: 'Garrett Wheeler',
    role: 'Co-Founder',
    photo: '/images/placeholder-team.jpg',
  },
  {
    name: 'Josef Ernst',
    role: 'Co-Founder',
    photo: '/images/placeholder-team.jpg',
  },
];

export default function TeamPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <p className="text-xs tracking-[0.3em] uppercase text-clf-text/50 border-l-[3px] border-clf-red pl-3 mb-6">
        The Team
      </p>
      <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Our Team</h1>
      <p className="font-sans text-xl text-clf-text/60 mb-12">
        Committed to unlocking resources for frontline caregivers.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {team.map((m) => (
          <div key={m.name} className="text-center">
            <div className="relative aspect-[3/4] w-full rounded-2xl bg-clf-warm-gray mb-4 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.photo} alt={m.name} className="w-full h-full object-cover" />
            </div>
            <h2 className="font-display text-2xl font-bold">{m.name}</h2>
            <p className="text-clf-red font-semibold">{m.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
