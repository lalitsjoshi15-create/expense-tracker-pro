"use client";
import React, { useState, useEffect } from 'react';
import { Download, PlusCircle, Trash2 } from 'lucide-react';

export default function Transactions() {
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

  const addTransaction = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newTx = {
      title: formData.get('title'),
      amount: parseFloat(formData.get('amount')),
      type: formData.get('type'),
      category: formData.get('category'),
    };

    const res = await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTx)
    });
    const saved = await res.json();
    setTransactions([saved, ...transactions]);
    e.target.reset();
  };

  const deleteTransaction = async (id) => {
    await fetch(`/api/transactions?id=${id}`, { method: 'DELETE' });
    setTransactions(transactions.filter(t => t._id !== id));
  };

  const exportCSV = () => {
    const headers = ["Title", "Amount", "Type", "Category", "Date"];
    const csvContent = [
      headers.join(","),
      ...transactions.map(t => [
        t.title.replace(/,/g, ""), 
        t.amount, 
        t.type, 
        t.category, 
        new Date(t.date).toLocaleDateString()
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "expense_transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <div className="animate-fade-in" style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}><div className="loader">Loading Transactions...</div></div>;

  return (
    <div className="animate-fade-in">
      <header style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '2rem' }}>Transactions</h2>
          <p className="subtitle">Manage your income and expenses.</p>
        </div>
        <button onClick={exportCSV} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Download size={18} /> Export CSV
        </button>
      </header>

      <div className="grid-2">
        <div className="glass-panel" style={{ padding: '24px', height: 'fit-content' }}>
          <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PlusCircle size={20} className="icon-primary" /> Add New Transaction
          </h3>
          <form onSubmit={addTransaction}>
            <input type="text" name="title" placeholder="Description (e.g., Groceries)" required />
            <div style={{ display: 'flex', gap: '16px' }}>
              <input type="number" name="amount" placeholder="Amount" step="0.01" min="0" required />
              <select name="type">
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <select name="category">
              <option value="Food">Food & Dining</option>
              <option value="Transport">Transport</option>
              <option value="Housing">Housing & Rent</option>
              <option value="Shopping">Shopping</option>
              <option value="Bills">Bills & Utilities</option>
              <option value="Salary">Salary (Income)</option>
              <option value="Other">Other</option>
            </select>
            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '16px' }}>Add Transaction</button>
          </form>
        </div>

        <div className="glass-panel" style={{ padding: '24px', maxHeight: '600px', overflowY: 'auto' }}>
          <h3 style={{ marginBottom: '24px' }}>History</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {transactions.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>No transactions found.</p>
            ) : (
              transactions.map(tx => (
                <div key={tx._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                  <div>
                    <h4 style={{ fontWeight: 600 }}>{tx.title}</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{tx.category} • {new Date(tx.date).toLocaleDateString()}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ fontWeight: 700, color: tx.type === 'income' ? 'var(--accent-success)' : 'var(--text-primary)' }}>
                      {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toFixed(2)}
                    </span>
                    <button onClick={() => deleteTransaction(tx._id)} className="btn-danger" style={{ padding: '6px' }}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
