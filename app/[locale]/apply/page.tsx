import { PartnerApplicationForm } from '@/components/PartnerApplicationForm';

export default function ApplyPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <p className="text-xs tracking-[0.3em] uppercase text-clf-text/50 border-l-[3px] border-clf-red pl-3 mb-6">
        Become a Partner
      </p>
      <h1 className="font-display text-5xl font-bold mb-4">Become a Caregiver Partner</h1>
      <p className="font-sans text-xl text-clf-text/60 mb-12">
        Apply to become a recipient partner organization and receive flexible, direct funding for the caregivers you represent.
      </p>
      <PartnerApplicationForm />
    </div>
  );
}
