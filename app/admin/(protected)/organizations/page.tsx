import Link from 'next/link';
import { queries } from '@/lib/db';

type Org = {
  id: number;
  name: string;
  country: string;
  featured: number;
};

export default function AdminOrgsPage() {
  const orgs = queries.getAllOrgs.all() as Org[];
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-clf-black">Organizations</h1>
        <Link
          href="/admin/organizations/new"
          className="bg-clf-red text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          + New Organization
        </Link>
      </div>
      <div className="bg-white rounded-xl border border-clf-warm-gray overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-clf-off-white border-b border-clf-warm-gray">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-clf-black">Name</th>
              <th className="text-left px-4 py-3 font-semibold text-clf-black">Country</th>
              <th className="text-left px-4 py-3 font-semibold text-clf-black">Featured</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {orgs.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-clf-text">
                  No organizations yet.
                </td>
              </tr>
            )}
            {orgs.map(o => (
              <tr key={o.id} className="border-b border-clf-warm-gray hover:bg-clf-off-white">
                <td className="px-4 py-3 font-medium text-clf-black">{o.name}</td>
                <td className="px-4 py-3 text-clf-text">{o.country}</td>
                <td className="px-4 py-3 text-clf-text">{o.featured ? '★' : '—'}</td>
                <td className="px-4 py-3">
                  <Link href={`/admin/organizations/${o.id}`} className="text-clf-red hover:underline">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
