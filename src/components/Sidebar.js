"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ListVideo, Sparkles, LogOut } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  // Don't show sidebar on public pages
  const publicPages = ['/', '/login', '/signup', '/about'];
  if (publicPages.includes(pathname)) return null;

  return (
    <aside className="sidebar glass-panel">
      <div style={{ padding: '0 16px' }}>
        <h2 className="gradient-text" style={{ fontSize: '1.8rem' }}>ExpenseTracker</h2>
        <p className="subtitle" style={{ fontSize: '0.8rem', marginTop: '4px' }}>Premium Tracker</p>
      </div>
      
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
        <Link href="/dashboard" className={`nav-link ${pathname === '/dashboard' ? 'active' : ''}`}>
          <LayoutDashboard size={20} /> Dashboard
        </Link>
        <Link href="/transactions" className={`nav-link ${pathname === '/transactions' ? 'active' : ''}`}>
          <ListVideo size={20} /> Transactions
        </Link>
        <Link href="/insights" className={`nav-link ${pathname === '/insights' ? 'active' : ''}`}>
          <Sparkles size={20} /> Insights
        </Link>
      </nav>

      <div>
        <Link href="/login" className="nav-link" style={{ color: 'var(--accent-danger)' }}>
          <LogOut size={20} /> Sign Out
        </Link>
      </div>
    </aside>
  );
}
