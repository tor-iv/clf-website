'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { safeHttpUrl } from '@/lib/url';

type OrgFormValues = {
  slug: string;
  name: string;
  country: string;
  region: string;
  tagline: string;
  description: string;
  history: string;
  vision: string;
  open_collective_url: string;
  featured: boolean;
  tags: string; // comma-separated
  photo_url: string;
};

const EMPTY: OrgFormValues = {
  slug: '',
  name: '',
  country: '',
  region: '',
  tagline: '',
  description: '',
  history: '',
  vision: '',
  open_collective_url: '',
  featured: false,
  tags: '',
  photo_url: '',
};

function labelClass() {
  return 'block text-sm font-medium text-clf-black mb-1';
}

function inputClass() {
  return 'w-full border border-clf-warm-gray rounded-lg px-3 py-2 text-clf-black focus:outline-none focus:ring-2 focus:ring-clf-red';
}

function textareaClass() {
  return 'w-full border border-clf-warm-gray rounded-lg px-3 py-2 text-clf-black focus:outline-none focus:ring-2 focus:ring-clf-red min-h-[100px]';
}

export function OrgForm({
  initial,
  orgId,
}: {
  initial?: Partial<OrgFormValues>;
  orgId?: number;
}) {
  const [values, setValues] = useState<OrgFormValues>({ ...EMPTY, ...initial });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  function set<K extends keyof OrgFormValues>(k: K, v: OrgFormValues[K]) {
    setValues(prev => ({ ...prev, [k]: v }));
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    setUploading(false);
    if (res.ok) {
      const { url } = await res.json();
      set('photo_url', url);
    } else {
      const { error: msg } = await res.json().catch(() => ({ error: 'Upload failed' }));
      setError(msg ?? 'Upload failed');
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');

    const payload = {
      ...values,
      tags: values.tags
        .split(',')
        .map(t => t.trim())
        .filter(Boolean),
      featured: values.featured ? 1 : 0,
    };

    const url = orgId
      ? `/api/admin/organizations/${orgId}`
      : '/api/admin/organizations';
    const method = orgId ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    setSaving(false);
    if (res.ok) {
      router.push('/admin/organizations');
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({ error: 'Unknown error' }));
      setError(data.error ?? 'Save failed');
    }
  }

  async function handleDelete() {
    if (!orgId) return;
    if (!confirm('Delete this organization? This cannot be undone.')) return;
    const res = await fetch(`/api/admin/organizations/${orgId}`, { method: 'DELETE' });
    if (res.ok) {
      router.push('/admin/organizations');
      router.refresh();
    } else {
      setError('Delete failed');
    }
  }

  const safePhotoUrl = safeHttpUrl(values.photo_url);

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass()}>Slug *</label>
          <input
            className={inputClass()}
            value={values.slug}
            onChange={e => set('slug', e.target.value)}
            required
            placeholder="e.g. helping-hands-kenya"
          />
        </div>
        <div>
          <label className={labelClass()}>Name *</label>
          <input
            className={inputClass()}
            value={values.name}
            onChange={e => set('name', e.target.value)}
            required
            placeholder="Organization name"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass()}>Country *</label>
          <input
            className={inputClass()}
            value={values.country}
            onChange={e => set('country', e.target.value)}
            required
            placeholder="Kenya"
          />
        </div>
        <div>
          <label className={labelClass()}>Region</label>
          <input
            className={inputClass()}
            value={values.region}
            onChange={e => set('region', e.target.value)}
            placeholder="Nairobi"
          />
        </div>
      </div>

      <div>
        <label className={labelClass()}>Tagline</label>
        <input
          className={inputClass()}
          value={values.tagline}
          onChange={e => set('tagline', e.target.value)}
          placeholder="Short tagline"
        />
      </div>

      <div>
        <label className={labelClass()}>Description *</label>
        <textarea
          className={textareaClass()}
          value={values.description}
          onChange={e => set('description', e.target.value)}
          required
          placeholder="What does this organization do?"
        />
      </div>

      <div>
        <label className={labelClass()}>History</label>
        <textarea
          className={textareaClass()}
          value={values.history}
          onChange={e => set('history', e.target.value)}
          placeholder="Background and founding story"
        />
      </div>

      <div>
        <label className={labelClass()}>Vision</label>
        <textarea
          className={textareaClass()}
          value={values.vision}
          onChange={e => set('vision', e.target.value)}
          placeholder="Long-term vision"
        />
      </div>

      <div>
        <label className={labelClass()}>Open Collective URL</label>
        <input
          className={inputClass()}
          type="url"
          value={values.open_collective_url}
          onChange={e => set('open_collective_url', e.target.value)}
          placeholder="https://opencollective.com/…"
        />
      </div>

      <div>
        <label className={labelClass()}>Tags (comma-separated)</label>
        <input
          className={inputClass()}
          value={values.tags}
          onChange={e => set('tags', e.target.value)}
          placeholder="caregiving, africa, grassroots"
        />
      </div>

      <div>
        <label className={labelClass()}>Photo</label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="px-4 py-2 border border-clf-warm-gray rounded-lg text-sm font-medium text-clf-black hover:bg-clf-off-white transition-colors disabled:opacity-60"
          >
            {uploading ? 'Uploading…' : 'Upload Photo'}
          </button>
          {values.photo_url && (
            <a
              href={safePhotoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-clf-red hover:underline truncate max-w-xs"
            >
              {values.photo_url}
            </a>
          )}
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp,image/avif"
          className="hidden"
          onChange={handleUpload}
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          id="featured"
          type="checkbox"
          checked={values.featured}
          onChange={e => set('featured', e.target.checked)}
          className="accent-clf-red h-4 w-4"
        />
        <label htmlFor="featured" className="text-sm font-medium text-clf-black">
          Featured organization
        </label>
      </div>

      {error && <p className="text-clf-red text-sm">{error}</p>}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="bg-clf-red text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {saving ? 'Saving…' : orgId ? 'Save Changes' : 'Create Organization'}
        </button>
        {orgId && (
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 border border-clf-warm-gray rounded-lg text-sm font-medium text-clf-text hover:bg-clf-off-white transition-colors"
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
}
