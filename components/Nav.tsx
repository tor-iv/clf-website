'use client';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { DONATE_URL } from '@/lib/site-config';
import { Logo } from './Logo';
import { LocaleSwitcher } from './LocaleSwitcher';
import { useState } from 'react';

export function Nav() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const base = `/${locale}`;

  const links = [
    { href: `${base}/about`, label: t('about') },
    { href: `${base}/what-we-do`, label: t('whatWeDo') },
    { href: `${base}/organizations`, label: t('organizations') },
    { href: `${base}/campaigns`, label: t('campaigns') },
    { href: `${base}/impact`, label: t('impact') },
    { href: `${base}/team`, label: t('team') },
    { href: `${base}/contact`, label: t('contact') },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-clf-off-white border-b border-clf-warm-gray">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16">
        <Link href={`${base}`}><Logo className="h-7 w-auto" /></Link>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-clf-text">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="hover:text-clf-red transition-colors">
              {l.label}
            </Link>
          ))}
          <LocaleSwitcher />
          <Link
            href={DONATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 bg-clf-red text-white px-4 py-2 rounded-lg hover:bg-clf-red/90 transition-colors font-semibold text-sm"
          >
            {t('donate')}
          </Link>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <span className="block w-6 h-0.5 bg-clf-black mb-1.5" />
          <span className="block w-6 h-0.5 bg-clf-black mb-1.5" />
          <span className="block w-6 h-0.5 bg-clf-black" />
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-clf-off-white border-t border-clf-warm-gray px-4 py-4 flex flex-col gap-4">
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-clf-black font-medium border-l-[3px] border-clf-red pl-3">
              {l.label}
            </Link>
          ))}
          <LocaleSwitcher />
          <Link
            href={DONATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="bg-clf-red text-white text-center px-4 py-2 rounded-lg font-semibold"
          >
            {t('donate')}
          </Link>
        </div>
      )}
    </nav>
  );
}
