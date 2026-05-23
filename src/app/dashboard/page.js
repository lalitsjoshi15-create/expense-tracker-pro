"use client";
import React, { useState, useEffect } from 'react';
import { Wallet, TrendingUp, TrendingDown, CalendarDays } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Feature: Monthly Budgeting
  const [budget] = useState(2500); 

  useEffect(() => {
    fetch('/api/transactions')
      .then(res => res.json())
      .then(data => {
        setTransactions(data);
        setLoading(false);
      });
  }, []);

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
  const balance = totalIncome - totalExpense;

  const chartData = transactions.slice(0, 10).reverse().map(t => ({
    name: new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    amount: t.type === 'expense' ? t.amount : 0
  }));

  const budgetSpentPercent = Math.min((totalExpense / budget) * 100, 100);

  if (loading) return <div className="animate-fade-in" style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}><div className="loader">Loading Dashboard...</div></div>;

  return (
    <div className="animate-fade-in">
      <header style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '2rem' }}>Dashboard Overview</h2>
        <p className="subtitle">Your financial snapshot.</p>
      </header>

      <div className="grid-3" style={{ marginBottom: '32px' }}>
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ color: 'var(--text-secondary)' }}>Total Balance</h3>
            <Wallet style={{ color: 'var(--accent-primary)' }} />
          </div>
          <h2 style={{ fontSize: '2.5rem' }}>₹{balance.toFixed(2)}</h2>
        </div>

        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ color: 'var(--text-secondary)' }}>Total Income</h3>
            <TrendingUp style={{ color: 'var(--accent-success)' }} />
          </div>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--accent-success)' }}>₹{totalIncome.toFixed(2)}</h2>
        </div>

        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ color: 'var(--text-secondary)' }}>Total Expenses</h3>
            <TrendingDown style={{ color: 'var(--accent-danger)' }} />
          </div>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--accent-danger)' }}>₹{totalExpense.toFixed(2)}</h2>
        </div>
      </div>

      <div className="grid-2">
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ marginBottom: '24px' }}>Expense Trends</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="var(--text-secondary)" />
                <YAxis stroke="var(--text-secondary)" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--glass-bg)', borderColor: 'var(--glass-border)', borderRadius: '12px' }}
                  itemStyle={{ color: 'var(--accent-primary)' }}
                />
                <Line type="monotone" dataKey="amount" stroke="var(--accent-primary)" strokeWidth={3} dot={{ r: 6, fill: 'var(--bg-dark)', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3>Monthly Budget Tracker</h3>
            <CalendarDays style={{ color: 'var(--accent-secondary)' }} />
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Spent</span>
              <span style={{ fontWeight: 600 }}>₹{totalExpense.toFixed(2)} / ₹{budget}</span>
            </div>
            
            <div style={{ width: '100%', height: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', overflow: 'hidden' }}>
              <div style={{ 
                width: `${budgetSpentPercent}%`, 
                height: '100%', 
                background: budgetSpentPercent > 90 ? 'var(--accent-danger)' : 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))',
                borderRadius: '6px',
                transition: 'width 1s ease-in-out'
              }}></div>
            </div>
            
            <p style={{ marginTop: '16px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              {budgetSpentPercent >= 100 
                ? "You have exceeded your monthly budget."
                : `You have ₹${(budget - totalExpense).toFixed(2)} left to spend this month.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
