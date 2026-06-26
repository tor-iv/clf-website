import { useTranslations, useLocale } from 'next-intl';
import { Logo } from './Logo';
import Link from 'next/link';
import { DONATE_URL } from '@/lib/site-config';

export function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  return (
    <footer className="bg-clf-black text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <Logo inverted className="h-8 w-auto mb-3" />
          <p className="text-white/70 text-sm">{t('tagline')}</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Navigate</h4>
          <ul className="space-y-2 text-sm text-white/70">
            {['about', 'what-we-do', 'organizations', 'campaigns', 'impact', 'team', 'contact'].map(p => (
              <li key={p}>
                <Link href={`/${locale}/${p}`} className="hover:text-white capitalize">
                  {p.replace('-', ' ')}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Caregiver Liberation Fund</h4>
          <p className="text-sm text-white/70">© {new Date().getFullYear()} CLF. {t('rights')}</p>
          <a
            href={DONATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-clf-red text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-clf-red/80 transition-colors mt-4"
          >
            Fund Caregivers
          </a>
        </div>
      </div>
    </footer>
  );
}
