const team = [
  {
    name: 'Garrett Wheeler',
    role: 'Co-Founder',
    bio: 'Medical student with experience working with Community Health Workers. Interested in finding ways to unlock resources at the grassroots level without stipulations.',
    photo: '/images/placeholder-team.jpg',
  },
  {
    name: 'Josef Ernst',
    role: 'Co-Founder',
    bio: 'Medical student with experience working with Community Health Workers. Interested in finding ways to unlock resources at the grassroots level without stipulations.',
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
        Medical students committed to unlocking resources for frontline caregivers.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {team.map((m) => (
          <div key={m.name} className="text-center border border-clf-warm-gray rounded-2xl p-8">
            <div className="w-24 h-24 rounded-full bg-clf-warm-gray mx-auto mb-4 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.photo} alt={m.name} className="w-full h-full object-cover" />
            </div>
            <h2 className="font-display text-2xl font-bold">{m.name}</h2>
            <p className="text-clf-red font-semibold mb-3">{m.role}</p>
            <p className="font-sans text-clf-text/70">{m.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
