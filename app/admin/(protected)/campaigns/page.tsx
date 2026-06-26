import Link from 'next/link';
import { queries } from '@/lib/db';

type Campaign = {
  id: number;
  slug: string;
  title: string;
  status: string;
  org_name: string | null;
  start_date: string | null;
};

export default function AdminCampaignsPage() {
  const campaigns = queries.getAllCampaigns.all() as Campaign[];
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-clf-black">Campaigns</h1>
        <Link
          href="/admin/campaigns/new"
          className="bg-clf-red text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          + New Campaign
        </Link>
      </div>
      <div className="bg-white rounded-xl border border-clf-warm-gray overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-clf-off-white border-b border-clf-warm-gray">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-clf-black">Title</th>
              <th className="text-left px-4 py-3 font-semibold text-clf-black">Organization</th>
              <th className="text-left px-4 py-3 font-semibold text-clf-black">Status</th>
              <th className="text-left px-4 py-3 font-semibold text-clf-black">Start Date</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-clf-text">
                  No campaigns yet.
                </td>
              </tr>
            )}
            {campaigns.map(c => (
              <tr key={c.id} className="border-b border-clf-warm-gray hover:bg-clf-off-white">
                <td className="px-4 py-3 font-medium text-clf-black">{c.title}</td>
                <td className="px-4 py-3 text-clf-text">{c.org_name ?? '—'}</td>
                <td className="px-4 py-3 text-clf-text capitalize">{c.status}</td>
                <td className="px-4 py-3 text-clf-text">{c.start_date ?? '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
