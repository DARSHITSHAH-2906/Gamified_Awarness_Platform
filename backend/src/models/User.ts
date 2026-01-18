import mongoose, { Schema, Document, mongo } from 'mongoose';

export interface ILevelProgress {
    levelId: mongoose.Types.ObjectId;
    status: 'locked' | 'unlocked' | 'completed';
    stars: number;
    xpEarned: number;
    solvedChallenges: mongoose.Types.ObjectId[];
    completedAt?: Date;
}

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    avatarId: string;
    progress: ILevelProgress[];
    xp: number;
    currentRegion: string;
    totalStars: number;
    level: number;
    accuracy: number;
    badges: string[];
    streak: {
        count: number;
        lastLogin: Date;
    };
    dailyQuests: {
        questId: mongoose.Types.ObjectId;
        xpReward: number;
        progress: number;
        isClaimed: boolean;
        assignedAt: Date;
    }[];
    currency: number;
    reputation: number;
    social: {
        dailyKudosCount: number;
        lastKudosDate: Date;
    };
    location: string;
    bio: string;
    aboutMe: string;
    achievements: {
        title: string;
        date: Date;
        description: string;
    }[];
    topSkills: string[];
    volunteeringExperience: {
        role: string;
        organization: string;
        startDate: Date;
        endDate?: Date;
        description: string;
    }[];
    createdAt: Date;
}

const UserSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    avatarId: { type: String, default: '1' },
    xp: { type: Number, default: 0 },
    progress: [{
        levelId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Level' },
        status: { type: String, enum: ['locked', 'unlocked', 'completed'], default: 'locked' },
        stars: { type: Number, default: 0 },
        xpEarned: { type: Number, default: 0 },
        solvedChallenges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Challenge' }],
        completedAt: { type: Date }
    }],
    currentRegion: { type: String, default: 'rti' },
    totalStars: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    accuracy: { type: Number, default: 0 },
    badges: [{ type: String }],
    streak: {
        count: { type: Number, default: 1 },
        lastLogin: { type: Date, default: Date.now }
    },
    dailyQuests: [{
        questId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
        xpReward: { type: Number, default: 0 },
        progress: { type: Number, default: 0 },
        isClaimed: { type: Boolean, default: false },
        assignedAt: { type: Date, default: Date.now }
    }],
    currency: { type: Number, default: 0 },
    reputation: { type: Number, default: 0 },
    social: {
        dailyKudosCount: { type: Number, default: 0 },
        lastKudosDate: { type: Date, default: Date.now }
    },
    // proper profile fields
    location: { type: String, default: '' },
    bio: { type: String, default: '' },
    aboutMe: { type: String, default: '' },
    achievements: [{
        title: { type: String, required: true },
        date: { type: Date, default: Date.now },
        description: { type: String, default: '' }
    }],
    topSkills: [{ type: String }],
    volunteeringExperience: [{
        role: { type: String, required: true },
        organization: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date },
        description: { type: String, default: '' }
    }]
}, {
    timestamps: true
});

export default mongoose.model<IUser>('User', UserSchema);
