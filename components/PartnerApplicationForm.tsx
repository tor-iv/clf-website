'use client';
import { useState } from 'react';

export function PartnerApplicationForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const res = await fetch('/api/apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    setStatus(res.ok ? 'success' : 'error');
  }

  if (status === 'success') {
    return (
      <div className="bg-clf-amber text-clf-black p-6 rounded-xl text-center font-semibold">
        Application received — thank you! We&apos;ll be in touch.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status === 'error' && (
        <div className="bg-clf-red/10 text-clf-red p-4 rounded-lg text-sm font-medium">
          Something went wrong. Please try again.
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Organization Name</label>
          <input
            name="orgName"
            required
            className="w-full border border-clf-warm-gray rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-clf-red bg-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Contact Name</label>
          <input
            name="contactName"
            required
            className="w-full border border-clf-warm-gray rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-clf-red bg-white"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            name="email"
            type="email"
            required
            className="w-full border border-clf-warm-gray rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-clf-red bg-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Country</label>
          <input
            name="country"
            required
            className="w-full border border-clf-warm-gray rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-clf-red bg-white"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Website / Social Media (optional)</label>
        <input
          name="website"
          className="w-full border border-clf-warm-gray rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-clf-red bg-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          Tell us about your organization — who you are, the caregivers you represent, and what funding would let you do
        </label>
        <textarea
          name="description"
          required
          rows={5}
          className="w-full border border-clf-warm-gray rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-clf-red bg-white"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-clf-red text-white py-3 rounded-xl font-semibold hover:bg-clf-red/90 disabled:opacity-50 transition-colors"
      >
        {status === 'loading' ? 'Submitting...' : 'Submit Application'}
      </button>
    </form>
  );
}
