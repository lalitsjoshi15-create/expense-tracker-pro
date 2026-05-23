import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Transaction from '@/lib/models/Transaction';

// In-memory fallback for independent / base project usage without MongoDB
let fallbackTransactions = [
  { _id: '1', title: 'Salary', amount: 5000, type: 'income', category: 'Salary', date: new Date().toISOString() },
  { _id: '2', title: 'Rent', amount: 1500, type: 'expense', category: 'Housing', date: new Date(Date.now() - 86400000).toISOString() },
  { _id: '3', title: 'Groceries', amount: 200, type: 'expense', category: 'Food', date: new Date(Date.now() - 172800000).toISOString() },
  { _id: '4', title: 'Internet', amount: 80, type: 'expense', category: 'Bills', date: new Date(Date.now() - 259200000).toISOString() }
];

export async function GET() {
  try {
    const db = await connectToDatabase();
    if (db) {
      const transactions = await Transaction.find({}).sort({ date: -1 });
      return NextResponse.json(transactions);
    }
    return NextResponse.json(fallbackTransactions);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const db = await connectToDatabase();
    if (db) {
      const transaction = await Transaction.create(data);
      return NextResponse.json(transaction, { status: 201 });
    }
    
    const newTx = { ...data, _id: Date.now().toString(), date: new Date().toISOString() };
    fallbackTransactions = [newTx, ...fallbackTransactions];
    return NextResponse.json(newTx, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create transaction' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const db = await connectToDatabase();
    if (db) {
      await Transaction.findByIdAndDelete(id);
      return NextResponse.json({ success: true });
    }
    fallbackTransactions = fallbackTransactions.filter(t => t._id !== id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete transaction' }, { status: 500 });
  }
}
