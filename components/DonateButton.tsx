import Link from 'next/link';

export function DonateButton({ label = 'Fund Caregivers Unconditionally' }: { label?: string }) {
  return (
    <Link
      href="#open-collective-link"
      className="inline-block bg-clf-red text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-clf-red/80 transition-colors"
    >
      {label}
    </Link>
  );
}
