'use client';
import Link from 'next/link';
import { Logo } from '../Logo';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/organizations', label: 'Organizations' },
  { href: '/admin/campaigns', label: 'Campaigns' },
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <aside className="w-56 bg-white border-r border-clf-warm-gray p-4 flex flex-col">
      <div className="mb-6">
        <Logo className="h-7 w-auto" />
      </div>
      <nav className="flex-1 space-y-1">
        {links.map(l => (
          <Link
            key={l.href}
            href={l.href}
            className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              pathname === l.href
                ? 'bg-clf-red text-white'
                : 'text-clf-black hover:bg-clf-warm-gray'
            }`}
          >
            {l.label}
          </Link>
        ))}
      </nav>
      <button
        onClick={async () => {
          await fetch('/api/admin/auth', { method: 'DELETE' });
          window.location.href = '/admin/login';
        }}
        className="text-sm text-clf-text hover:text-clf-black mt-4 text-left"
      >
        Log out
      </button>
    </aside>
  );
}
