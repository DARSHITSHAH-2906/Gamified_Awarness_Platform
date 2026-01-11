import mongoose, { Schema, Document } from 'mongoose';

export interface IDuel extends Document {
    challengerId: mongoose.Types.ObjectId;
    opponentId: mongoose.Types.ObjectId;
    metric: string; // 'XP', 'STEPS', 'PUZZLES'
    checkType: 'HIGHER_WINS' | 'LOWER_WINS'; // Usually higher
    wager: number;
    durationDays: number;
    challengerStartValue: number;
    opponentStartValue: number;
    status: 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'DECLINED' | 'TIED'; // Added TIED
    startTime?: Date;
    endTime?: Date;
    winnerId?: mongoose.Types.ObjectId;
}

const DuelSchema: Schema = new Schema({
    challengerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    opponentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    metric: { type: String, required: true }, // e.g., 'XP'
    checkType: { type: String, enum: ['HIGHER_WINS', 'LOWER_WINS'], default: 'HIGHER_WINS' },
    wager: { type: Number, default: 0 },
    durationDays: { type: Number, default: 1 },
    challengerStartValue: { type: Number, default: 0 },
    opponentStartValue: { type: Number, default: 0 },
    status: { type: String, enum: ['PENDING', 'ACTIVE', 'COMPLETED', 'DECLINED'], default: 'PENDING' },
    startTime: { type: Date },
    endTime: { type: Date },
    winnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
});

export default mongoose.model<IDuel>('Duel', DuelSchema);
