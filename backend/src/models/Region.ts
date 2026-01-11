import mongoose, { Schema, Document } from 'mongoose';

export interface IRegion extends Document {
    regionId: string; // e.g., "rti"
    title: string;
    description: string;
    themeColor: string;
    bgGradient: string; // New field for UI
    order: number;
}

const RegionSchema: Schema = new Schema({
    regionId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String },
    themeColor: { type: String, default: '#3b82f6' },
    bgGradient: { type: String, default: 'from-blue-50 to-blue-100' },
    order: { type: Number, required: true }
});

export default mongoose.model<IRegion>('Region', RegionSchema);
