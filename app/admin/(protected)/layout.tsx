import { isAuthenticated } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { AdminNav } from '@/components/admin/AdminNav';

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isAuthenticated();
  if (!authed) redirect('/admin/login');
  return (
    <div className="min-h-screen bg-clf-off-white flex">
      <AdminNav />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
