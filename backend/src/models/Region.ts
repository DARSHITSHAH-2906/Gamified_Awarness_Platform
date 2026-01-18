import mongoose, { Schema, Document } from 'mongoose';

export interface IRegion extends Document {
    // regionId removed
    title: string;
    description: string;
    themeColor: string;
    bgGradient: string;
    order: number;
    levels: mongoose.Schema.Types.ObjectId[];
}

const RegionSchema: Schema = new Schema({
    // regionId removed
    title: { type: String, required: true },
    description: { type: String },
    themeColor: { type: String, default: '#3b82f6' },
    bgGradient: { type: String, default: 'from-blue-50 to-blue-100' },
    levels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Level' }],
    order: { type: Number, required: true }
});

export default mongoose.model<IRegion>('Region', RegionSchema);
