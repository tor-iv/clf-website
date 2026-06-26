import { queries } from '@/lib/db';
import { OrgCard } from '@/components/OrgCard';

export default function OrganizationsPage() {
  const orgs = queries.getAllOrgs.all() as any[];
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="font-display text-5xl font-bold mb-4">Organizations</h1>
        <p className="font-sans text-xl text-clf-text/60 max-w-2xl mx-auto">
          Frontline caregiver associations organizing for healthier, more resilient communities.
        </p>
      </div>
      {orgs.length === 0 ? (
        <div className="text-center py-20 text-clf-text/40">
          <p className="text-lg">Partner organizations coming soon.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orgs.map((org) => (
            <OrgCard key={org.slug} org={org} />
          ))}
        </div>
      )}
    </div>
  );
}
