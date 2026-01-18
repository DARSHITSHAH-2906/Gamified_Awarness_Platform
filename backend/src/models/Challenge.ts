import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IChallenge extends Document {
    type: string;
    levelId: mongoose.Types.ObjectId;
    data: any;
    xp: number;
}

const ChallengeSchema: Schema = new Schema({
    type: { type: String, required: true },
    gameType: { type: String, required: true }, // Specific renderer type
    levelId: { type: mongoose.Types.ObjectId, ref: 'Level', required: true },
    lawId: { type: String }, // Topic identifier
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'easy' },
    badge: { type: String }, // Optional badge award
    order: { type: Number, default: 0 },
    data: { type: Schema.Types.Mixed, required: true },
    xp: { type: Number, required: true, default: 10 }
}, {
    timestamps: true
});

export default mongoose.model<IChallenge>('Challenge', ChallengeSchema);
