'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/Logo';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) {
      router.push('/admin');
    } else {
      setError('Incorrect password');
    }
  }

  return (
    <div className="min-h-screen bg-clf-off-white flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <Logo className="h-10 w-auto" />
        </div>
        <h1 className="font-display font-bold text-xl text-center mb-6 text-clf-black">
          Admin Login
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border border-clf-warm-gray rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-clf-red text-clf-black"
          />
          {error && <p className="text-clf-red text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-clf-red text-white py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {loading ? 'Logging in…' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  );
}
