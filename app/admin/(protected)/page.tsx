import { db } from '@/lib/db';
import Link from 'next/link';

export default function AdminDashboard() {
  const orgCount = (db.prepare('SELECT COUNT(*) as n FROM organizations').get() as { n: number }).n;
  const campaignCount = (db.prepare('SELECT COUNT(*) as n FROM campaigns').get() as { n: number }).n;
  const contactCount = (db.prepare('SELECT COUNT(*) as n FROM contact_submissions').get() as { n: number }).n;

  const cards = [
    { label: 'Organizations', count: orgCount, href: '/admin/organizations' },
    { label: 'Campaigns', count: campaignCount, href: '/admin/campaigns' },
    { label: 'Contact Submissions', count: contactCount, href: '#' },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-6 text-clf-black">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        {cards.map(c => (
          <Link
            key={c.label}
            href={c.href}
            className="bg-white border border-clf-warm-gray rounded-xl p-6 hover:shadow-md transition-shadow"
          >
            <div className="font-display text-3xl font-bold text-clf-red mb-1">{c.count}</div>
            <div className="text-sm text-clf-text">{c.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
