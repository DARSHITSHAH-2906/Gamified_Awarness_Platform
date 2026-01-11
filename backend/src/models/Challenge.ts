import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IChallenge extends Document {
    challengeId: string;
    type: string;
    levelId: mongoose.Types.ObjectId;
}

const ChallengeSchema: Schema = new Schema({
    challengeId: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    levelId: { type: mongoose.Types.ObjectId, ref: 'Level', required: true }
}, {
    timestamps: true
});

export default mongoose.model<IChallenge>('Challenge', ChallengeSchema);
