'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loginUser } from '@/lib/api';
import { setToken } from '@/lib/auth';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await loginUser({ email, password });
      if (data.success && data.data.token) {
        setToken(data.data.token);
        router.push('/');
      } else {
        setError('Login failed, please check your credentials.');
      }
    } catch (err) {
      setError(err.message || 'An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
      <div className="glass-card p-4 p-md-5" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="mb-4 text-center" style={{ fontWeight: '700' }}>Welcome Back</h2>
        
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-secondary">Email</label>
            <input
              type="email"
              className="form-control"
              style={{ background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--text-secondary)' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label text-secondary">Password</label>
            <input
              type="password"
              className="form-control"
              style={{ background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--text-secondary)' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn w-100 mb-3 text-white"
            style={{ background: 'var(--accent)', border: 'none' }}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="text-center mt-3 text-secondary">
          Don't have an account? <Link href="/register" style={{ color: 'var(--accent)' }}>Sign up</Link>
        </div>
      </div>
    </div>
  );
}
