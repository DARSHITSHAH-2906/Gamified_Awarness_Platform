import mongoose, { Schema, Document } from 'mongoose';

export interface ILevel extends Document {
    // levelId removed
    levelNumber: number;
    title: string;
    description: string;
    regionId: mongoose.Types.ObjectId;
    difficulty: 'EASY' | 'MEDIUM' | 'HARD';
    order: number;
    config: {
        gridSize?: number;
        timeLimit?: number; // seconds
        minStarsThreshold?: number;
    };
    x: number;
    y: number;
}

const LevelSchema: Schema = new Schema({
    // levelId removed
    levelNumber: { type: Number, required: true, unique: true }, // Global sequential level number (1, 2, 3...)
    title: { type: String, required: true },
    description: { type: String },
    regionId: { type: Schema.Types.ObjectId, ref: 'Region', required: true, index: true }, // Mapped to Region _id
    difficulty: { type: String, enum: ['EASY', 'MEDIUM', 'HARD'], default: 'EASY' },
    order: { type: Number, required: true }, // Order within region? Or remove if redundant
    config: {
        gridSize: { type: Number, default: 10 },
        timeLimit: { type: Number },
        minStarsThreshold: { type: Number, default: 1 }
    },
    x: { type: Number, required: true },
    y: { type: Number, required: true }
});

export default mongoose.model<ILevel>('Level', LevelSchema);
