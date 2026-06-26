import Link from 'next/link';
import { OrgForm } from '@/components/admin/OrgForm';

export default function NewOrgPage() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/organizations" className="text-clf-text hover:text-clf-black text-sm">
          ← Organizations
        </Link>
        <span className="text-clf-warm-gray">/</span>
        <h1 className="font-display text-2xl font-bold text-clf-black">New Organization</h1>
      </div>
      <div className="bg-white rounded-xl border border-clf-warm-gray p-6">
        <OrgForm />
      </div>
    </div>
  );
}
