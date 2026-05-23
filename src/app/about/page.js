"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Code, Database, LayoutTemplate, ShieldCheck } from 'lucide-react';

export default function About() {
  return (
    <div className="animate-fade-in" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 24px' }}>
      
      <div style={{ width: '100%', maxWidth: '900px' }}>
        <Link href="/">
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '40px', background: 'transparent', border: '1px solid var(--glass-border)', color: 'var(--text-primary)' }}>
            <ArrowLeft size={16} /> Back to Home
          </button>
        </Link>
        
        <header style={{ marginBottom: '48px', textAlign: 'center' }}>
          <h1 className="gradient-text" style={{ fontSize: '3.5rem', marginBottom: '16px' }}>About The Project</h1>
          <p className="subtitle" style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            A next-generation financial tracker built with modern web technologies, designed to demonstrate full-stack engineering proficiency.
          </p>
        </header>

        <div className="grid-2">
          <div className="glass-panel" style={{ padding: '32px', transition: 'transform 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ padding: '10px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px' }}><LayoutTemplate style={{ color: 'var(--accent-secondary)' }}/></div>
              <h3 style={{ fontSize: '1.4rem' }}>Next.js App Router</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Built from the ground up using React and the Next.js App Router architecture. Features instant client-side transitions and robust component encapsulation for optimal performance.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '32px', transition: 'transform 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ padding: '10px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px' }}><Database style={{ color: 'var(--accent-success)' }}/></div>
              <h3 style={{ fontSize: '1.4rem' }}>Zero-Config Engine</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Engineered with a resilient fallback system. If a MongoDB connection is not provided, the API automatically transitions to a mock in-memory data store, ensuring 100% uptime and accessibility.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '32px', transition: 'transform 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ padding: '10px', background: 'rgba(124, 58, 237, 0.1)', borderRadius: '12px' }}><Code style={{ color: 'var(--accent-primary)' }}/></div>
              <h3 style={{ fontSize: '1.4rem' }}>Premium UX/UI</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Features a bespoke glassmorphic design system. Utilizes Recharts for incredibly smooth, interactive data visualizations and dynamic mathematical tracking for budgets.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '32px', transition: 'transform 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ padding: '10px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '12px' }}><ShieldCheck style={{ color: '#f59e0b' }}/></div>
              <h3 style={{ fontSize: '1.4rem' }}>Data Portability</h3>
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Empowers users with complete control over their financial history through client-side CSV exports, leveraging native browser Blob APIs without server-side processing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
