'use client';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

const locales = [
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
  { code: 'fr', label: 'FR' },
  { code: 'sw', label: 'SW' },
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
    <div className="flex gap-1 text-sm">
      {locales.map((l) => (
        <button
          key={l.code}
          onClick={() => switchLocale(l.code)}
          className={`px-2 py-0.5 rounded ${locale === l.code ? 'bg-clf-red text-white' : 'text-clf-text/50 hover:text-clf-text'}`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
