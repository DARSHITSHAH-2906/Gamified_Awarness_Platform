import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
    senderId: mongoose.Types.ObjectId;
    recipientId: mongoose.Types.ObjectId;
    type: 'KUDOS' | 'GIFT';
    assetType: string; // 'highfive', 'coffee', etc.
    amount?: number; // Only for gifts
    message?: string;
    timestamp: Date;
}

const TransactionSchema: Schema = new Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    recipientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['KUDOS', 'GIFT'], required: true },
    assetType: { type: String, required: true },
    amount: { type: Number },
    message: { type: String },
    timestamp: { type: Date, default: Date.now }
});

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);
