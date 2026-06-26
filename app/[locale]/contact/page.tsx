'use client';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function ContactPage() {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    setStatus(res.ok ? 'success' : 'error');
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <p className="text-xs tracking-[0.3em] uppercase text-clf-text/50 border-l-[3px] border-clf-red pl-3 mb-6">
        Reach Out
      </p>
      <h1 className="font-display text-5xl font-bold mb-8">{t('title')}</h1>
      {status === 'success' ? (
        <div className="bg-clf-amber text-clf-black p-6 rounded-xl text-center font-semibold">
          {t('success')}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {status === 'error' && (
            <div className="bg-clf-red/10 text-clf-red p-4 rounded-lg text-sm font-medium">
              Something went wrong. Please try again.
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">{t('name')}</label>
              <input
                name="name"
                required
                className="w-full border border-clf-warm-gray rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-clf-red bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t('email')}</label>
              <input
                name="email"
                type="email"
                required
                className="w-full border border-clf-warm-gray rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-clf-red bg-white"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t('organization')}</label>
            <input
              name="organization"
              className="w-full border border-clf-warm-gray rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-clf-red bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t('message')}</label>
            <textarea
              name="message"
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
            {status === 'loading' ? 'Sending...' : t('submit')}
          </button>
        </form>
      )}
    </div>
  );
}
