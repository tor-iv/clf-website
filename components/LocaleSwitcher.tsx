'use client';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

const locales = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'sw', label: 'Kiswahili' },
];

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(next: string) {
    const segments = pathname.split('/');
    segments[1] = next;
    router.push(segments.join('/'));
  }

  return (
    <select
      value={locale}
      onChange={(e) => switchLocale(e.target.value)}
      aria-label="Select language"
      className="text-sm bg-transparent border border-clf-warm-gray rounded px-2 py-0.5 text-clf-text focus:outline-none focus:ring-1 focus:ring-clf-red cursor-pointer"
    >
      {locales.map((l) => (
        <option key={l.code} value={l.code}>
          {l.label}
        </option>
      ))}
    </select>
  );
}
