'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { registerUser } from '@/lib/api';
import { setToken } from '@/lib/auth';

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (password !== rePassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const data = await registerUser({ email, password, rePassword });
      if (data.success && data.data.token) {
        setToken(data.data.token);
        router.push('/');
      } else {
        setError('Registration failed.');
      }
    } catch (err) {
      setError(err.message || 'An error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
      <div className="glass-card p-4 p-md-5" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="mb-4 text-center" style={{ fontWeight: '700' }}>Create Account</h2>
        
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
          <div className="mb-3">
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
          <div className="mb-4">
            <label className="form-label text-secondary">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              style={{ background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--text-secondary)' }}
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn w-100 mb-3 text-white"
            style={{ background: 'var(--accent)', border: 'none' }}
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        <div className="text-center mt-3 text-secondary">
          Already have an account? <Link href="/login" style={{ color: 'var(--accent)' }}>Login</Link>
        </div>
      </div>
    </div>
  );
}
