"use client";
import React, { useState, useEffect } from 'react';
import { Sparkles, Activity } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function Insights() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

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
  
  let score = 50;
  if (totalIncome > 0) {
    const savingRate = ((totalIncome - totalExpense) / totalIncome) * 100;
    if (savingRate > 20) score += 30;
    else if (savingRate > 0) score += 10;
    else score -= 20;
  }
  if (totalExpense === 0 && totalIncome === 0) score = 0;
  score = Math.max(0, Math.min(100, Math.round(score)));

  let healthColor = 'var(--accent-secondary)';
  let healthMessage = 'Neutral standing.';
  if (score >= 80) { healthColor = 'var(--accent-success)'; healthMessage = 'Excellent financial health! Your saving rate is highly optimal.'; }
  else if (score >= 50) { healthColor = 'var(--accent-primary)'; healthMessage = 'Good standing. Your spending is relatively balanced.'; }
  else if (score > 0) { healthColor = 'var(--accent-danger)'; healthMessage = 'Warning: Your expenses are dangerously close to or exceeding your income.'; }
  else if (score === 0 && totalIncome === 0 && totalExpense === 0) { healthMessage = "Add transactions to calculate your score."; }

  const expensesByCategory = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  const pieData = Object.keys(expensesByCategory).map(key => ({
    name: key,
    value: expensesByCategory[key]
  }));

  const COLORS = ['#7c3aed', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#8b5cf6'];

  const insights = [];
  if (transactions.length === 0) {
    insights.push("Start adding transactions to get AI-powered insights.");
  } else {
    if (totalExpense > totalIncome && totalIncome > 0) {
      insights.push("Your expenses are currently higher than your income. Consider reviewing your top spending categories to find areas to cut back.");
    }
    const topCategory = [...pieData].sort((a,b) => b.value - a.value)[0];
    if (topCategory && topCategory.value > totalExpense * 0.4) {
      insights.push(`You are spending heavily on ${topCategory.name} (${Math.round((topCategory.value/totalExpense)*100)}% of your expenses). We recommend setting a strict budget for this category.`);
    }
    if (totalIncome > 0 && ((totalIncome - totalExpense) / totalIncome) > 0.2) {
      insights.push("Great job! You are saving more than 20% of your income. Consider putting the surplus into a high-yield savings account or investments.");
    }
    if (insights.length === 0) insights.push("Your spending seems balanced right now. Keep tracking consistently to maintain your good financial health.");
  }

  if (loading) return <div className="animate-fade-in" style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}><div className="loader">Loading Insights...</div></div>;

  return (
    <div className="animate-fade-in">
      <header style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '2rem' }}>Analytics & Insights</h2>
        <p className="subtitle">Deep dive into your financial habits.</p>
      </header>

      <div className="grid-2">
        <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h3 style={{ marginBottom: '32px', alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity size={20} style={{ color: healthColor }} /> Financial Health Score
          </h3>
          
          <div style={{
            position: 'relative', width: '200px', height: '200px', borderRadius: '50%',
            background: `conic-gradient(${healthColor} ${score * 3.6}deg, rgba(255,255,255,0.05) 0deg)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 0 40px ${healthColor}40`
          }}>
            <div style={{
              width: '180px', height: '180px', borderRadius: '50%', background: 'var(--bg-dark)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
            }}>
              <span style={{ fontSize: '3rem', fontWeight: 800, color: healthColor }}>{score}</span>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>out of 100</span>
            </div>
          </div>
          
          <p style={{ marginTop: '32px', textAlign: 'center', color: 'var(--text-primary)', fontWeight: 500 }}>{healthMessage}</p>
        </div>

        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ marginBottom: '24px' }}>Expenses by Category</h3>
          <div style={{ height: '300px' }}>
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--glass-bg)', borderColor: 'var(--glass-border)', borderRadius: '12px' }}
                    itemStyle={{ color: 'var(--text-primary)' }}
                  />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                No expenses recorded yet.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '32px', marginTop: '24px' }}>
        <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={20} style={{ color: 'var(--accent-primary)' }} /> AI Smart Insights
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {insights.map((insight, index) => (
            <div key={index} style={{ 
              padding: '16px', 
              background: 'linear-gradient(90deg, rgba(124, 58, 237, 0.1), transparent)', 
              borderLeft: '4px solid var(--accent-primary)',
              borderRadius: '0 8px 8px 0',
              lineHeight: 1.6
            }}>
              {insight}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
