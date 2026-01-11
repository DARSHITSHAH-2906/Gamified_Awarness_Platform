import mongoose, { Schema, Document } from 'mongoose';

export interface IQuest extends Document {
    questId: string;
    title: string;
    description: string;
    xpReward: number;
    type: 'DAILY' | 'WEEKLY' | 'ACHIEVEMENT';
    criteria: {
        type: 'LEVELS_COMPLETED' | 'STARS_EARNED' | 'LOGIN_STREAK' | 'PUZZLES_COMPLETED' | 'FEEDBACK_GIVEN';
        target: number;
    };
}

const QuestSchema: Schema = new Schema({
    questId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String },
    xpReward: { type: Number, required: true },
    type: { type: String, enum: ['DAILY', 'WEEKLY', 'ACHIEVEMENT'], default: 'DAILY' },
    criteria: {
        type: { type: String, enum: ['LEVELS_COMPLETED', 'STARS_EARNED', 'LOGIN_STREAK', 'PUZZLES_COMPLETED', 'FEEDBACK_GIVEN'], required: true },
        target: { type: Number, required: true }
    }
}, {
    timestamps: true
});

export default mongoose.model<IQuest>('Quest', QuestSchema);
