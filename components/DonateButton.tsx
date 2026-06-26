import Link from 'next/link';
import { DONATE_URL } from '@/lib/site-config';

export function DonateButton({ label = 'Fund Caregivers Unconditionally' }: { label?: string }) {
  return (
    <Link
      href={DONATE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block bg-clf-red text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-clf-red/80 transition-colors"
    >
      {label}
    </Link>
  );
}
