"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 800);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', width: '100%' }}>
      <div className="glass-panel animate-fade-in" style={{ padding: '48px', width: '100%', maxWidth: '420px', textAlign: 'center' }}>
        <h1 className="gradient-text" style={{ fontSize: '2.2rem', marginBottom: '8px' }}>Expense Tracker</h1>
        <p className="subtitle" style={{ marginBottom: '32px' }}>Welcome back. Please sign in.</p>
        
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email Address" required />
          <input type="password" placeholder="Password" required />
          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '16px' }}>
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
          <p style={{ marginTop: '24px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            (Demo Mode: Just click Sign In)
          </p>
        </form>
      </div>
    </div>
  );
}
