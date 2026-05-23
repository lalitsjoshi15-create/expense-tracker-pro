"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowRight, Shield, Zap, BarChart3 } from 'lucide-react';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="animate-fade-in" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Navigation Bar */}
      <nav style={{ width: '100%', maxWidth: '1200px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="gradient-text" style={{ fontSize: '2rem', margin: 0 }}>Expense Tracker</h1>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Link href="/about" className="nav-link" style={{ background: 'transparent', padding: 0 }}>About</Link>
          <Link href="/login" className="nav-link" style={{ background: 'transparent', padding: 0 }}>Sign In</Link>
          <Link href="/signup">
            <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              Sign Up <ArrowRight size={16} />
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header style={{ textAlign: 'center', maxWidth: '800px', marginTop: '60px', padding: '0 24px' }}>
        <h1 style={{ fontSize: '4rem', lineHeight: '1.1', marginBottom: '24px', background: 'linear-gradient(to right, #f8fafc, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Master Your Money with Smart Insights
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '40px', lineHeight: '1.6' }}>
          Stop wondering where your money goes. Track expenses, analyze spending habits, and get AI-powered insights to secure your financial future.
        </p>
        <Link href="/signup">
          <button className="btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem', borderRadius: '100px', boxShadow: '0 8px 30px rgba(124, 58, 237, 0.4)' }}>
            Start Tracking for Free
          </button>
        </Link>
      </header>

      {/* App Screenshot */}
      <div style={{ marginTop: '80px', width: '100%', maxWidth: '1000px', padding: '0 24px' }}>
        <div className="glass-panel" style={{ padding: '8px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: '16px', overflow: 'hidden', background: '#0a0a0f' }}>
            {/* Fallback color while image loads */}
            <Image 
              src="/mockup.png" 
              alt="Expense Tracker Dashboard Mockup" 
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section style={{ width: '100%', maxWidth: '1200px', padding: '100px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
        <div className="glass-panel" style={{ padding: '40px 32px', textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <BarChart3 size={32} style={{ color: 'var(--accent-secondary)' }} />
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Visual Analytics</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Understand your spending habits instantly with beautiful, interactive charts and a gamified health score.</p>
        </div>

        <div className="glass-panel" style={{ padding: '40px 32px', textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(124, 58, 237, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <Zap size={32} style={{ color: 'var(--accent-primary)' }} />
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Smart Insights</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Our intelligent engine analyzes your transactions and provides actionable advice to help you save more.</p>
        </div>

        <div className="glass-panel" style={{ padding: '40px 32px', textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <Shield size={32} style={{ color: 'var(--accent-success)' }} />
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Complete Privacy</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Your data remains yours. Export your transactions at any time, or run the app entirely offline.</p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '40px 24px', width: '100%', textAlign: 'center', color: 'var(--text-secondary)', borderTop: '1px solid var(--glass-border)' }}>
        <p>© {new Date().getFullYear()} Expense Tracker Pro. Built for modern financial freedom.</p>
      </footer>
    </div>
  );
}
