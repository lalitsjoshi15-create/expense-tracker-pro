import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, required: true, enum: ['income', 'expense'] },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);
