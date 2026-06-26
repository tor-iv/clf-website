'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewCampaignPage() {
  const router = useRouter();
  const [values, setValues] = useState({
    slug: '',
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    goal_amount: '',
    status: 'upcoming',
  });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  function set(k: string, v: string) {
    setValues(prev => ({ ...prev, [k]: v }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    const payload = {
      ...values,
      goal_amount: values.goal_amount ? Number(values.goal_amount) : null,
    };
    const res = await fetch('/api/admin/campaigns', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (res.ok) {
      router.push('/admin/campaigns');
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({ error: 'Unknown error' }));
      setError(data.error ?? 'Save failed');
    }
  }

  const inputClass =
    'w-full border border-clf-warm-gray rounded-lg px-3 py-2 text-clf-black focus:outline-none focus:ring-2 focus:ring-clf-red';
  const labelClass = 'block text-sm font-medium text-clf-black mb-1';

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/campaigns" className="text-clf-text hover:text-clf-black text-sm">
          ← Campaigns
        </Link>
        <span className="text-clf-warm-gray">/</span>
        <h1 className="font-display text-2xl font-bold text-clf-black">New Campaign</h1>
      </div>
      <div className="bg-white rounded-xl border border-clf-warm-gray p-6">
        <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Slug *</label>
              <input
                className={inputClass}
                value={values.slug}
                onChange={e => set('slug', e.target.value)}
                required
                placeholder="e.g. spring-2025"
              />
            </div>
            <div>
              <label className={labelClass}>Title *</label>
              <input
                className={inputClass}
                value={values.title}
                onChange={e => set('title', e.target.value)}
                required
                placeholder="Campaign title"
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Description *</label>
            <textarea
              className={`${inputClass} min-h-[100px]`}
              value={values.description}
              onChange={e => set('description', e.target.value)}
              required
              placeholder="What is this campaign about?"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Start Date</label>
              <input
                type="date"
                className={inputClass}
                value={values.start_date}
                onChange={e => set('start_date', e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>End Date</label>
              <input
                type="date"
                className={inputClass}
                value={values.end_date}
                onChange={e => set('end_date', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Goal Amount (USD)</label>
              <input
                type="number"
                min="0"
                className={inputClass}
                value={values.goal_amount}
                onChange={e => set('goal_amount', e.target.value)}
                placeholder="10000"
              />
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select
                className={inputClass}
                value={values.status}
                onChange={e => set('status', e.target.value)}
              >
                <option value="upcoming">Upcoming</option>
                <option value="active">Active</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>

          {error && <p className="text-clf-red text-sm">{error}</p>}

          <button
            type="submit"
            disabled={saving}
            className="bg-clf-red text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {saving ? 'Creating…' : 'Create Campaign'}
          </button>
        </form>
      </div>
    </div>
  );
}
