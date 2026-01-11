import mongoose, { Schema, Document } from 'mongoose';

export interface ILevel extends Document {
    levelId: string; // e.g., "101"
    title: string;
    description: string;
    regionId: string; // e.g., "rti"
    difficulty: 'EASY' | 'MEDIUM' | 'HARD';
    order: number; // 1, 2, 3...
    config: {
        gridSize?: number;
        timeLimit?: number; // seconds
        minStarsThreshold?: number;
    };
    games?: any; // Stores the challenge data structure
    x: number;
    y: number;
}

const LevelSchema: Schema = new Schema({
    levelId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String },
    regionId: { type: String, required: true, index: true },
    difficulty: { type: String, enum: ['EASY', 'MEDIUM', 'HARD'], default: 'EASY' },
    order: { type: Number, required: true },
    config: {
        gridSize: { type: Number, default: 10 },
        timeLimit: { type: Number },
        minStarsThreshold: { type: Number, default: 1 }
    },
    games: { type: Schema.Types.Mixed },
    x: { type: Number, required: true },
    y: { type: Number, required: true }
});

export default mongoose.model<ILevel>('Level', LevelSchema);
