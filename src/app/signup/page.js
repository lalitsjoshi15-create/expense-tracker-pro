"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserPlus, ArrowRight } from 'lucide-react';

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call for independent site
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', width: '100%' }}>
      <div className="glass-panel animate-fade-in" style={{ padding: '48px', width: '100%', maxWidth: '420px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(124, 58, 237, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <UserPlus style={{ color: 'var(--accent-primary)' }} />
          </div>
        </div>
        <h1 className="gradient-text" style={{ fontSize: '2.2rem', marginBottom: '8px' }}>Create Account</h1>
        <p className="subtitle" style={{ marginBottom: '32px' }}>Join us and master your money.</p>
        
        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input type="text" placeholder="Full Name" required style={{ width: '100%' }} />
          <input type="email" placeholder="Email Address" required style={{ width: '100%' }} />
          <input type="password" placeholder="Password" required style={{ width: '100%' }} />
          
          <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', marginTop: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
            {loading ? 'Creating...' : <>Sign Up <ArrowRight size={18} /></>}
          </button>
        </form>

        <p style={{ marginTop: '24px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Already have an account? <Link href="/login" style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 600 }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
}
