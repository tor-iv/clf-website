export function Logo({ className = '', inverted = false }: { className?: string; inverted?: boolean }) {
  const textColor = inverted ? '#FAFAF9' : '#1C1917';
  return (
    <svg viewBox="0 0 96 32" className={className} aria-label="CLF — Caregiver Liberation Fund" fill="none">
      {/* Red signature bar — the CLF mark */}
      <rect x="0" y="4" width="3" height="24" fill="#B91C1C" rx="1" />
      <text x="10" y="26" fontFamily="Bricolage Grotesque, sans-serif" fontWeight="800" fontSize="26" fill={textColor} letterSpacing="-0.5">CLF</text>
    </svg>
  );
}
