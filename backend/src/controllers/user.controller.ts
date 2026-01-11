import type { Request, Response } from 'express';
import User from '../models/User.js';
import { QuestController } from "./quest.controller.js";

export class UserController {
    constructor(private readonly questController: QuestController) { }

    async getUserProgress(req: Request, res: Response) {
        try {
            const userId = (req as any).user.id;
            const user = await User.findById(userId).select('-password');
            if (!user) return res.status(404).json({ message: 'User not found' });
            res.json(user.progress);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching progress' });
        }
    };

    async getLeaderboard(req: Request, res: Response) {
        try {
            const users = await User.find({})
                .sort({ xp: -1 })
                .limit(10)
                .select('username avatarId totalStars xp');
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching leaderboard' });
        }
    };

    async submitFeedback(req: Request, res: Response) {
        try {
            const userId = (req as any).user.id;
            // const { message } = req.body; 

            const user = await User.findById(userId);
            if (!user) return res.status(404).json({ message: 'User not found' });

            const updated = await this.questController.checkAndAdvanceQuest(user, 'FEEDBACK_GIVEN', 1);
            if (updated) await user.save();

            res.json({
                message: 'Feedback received',
                dailyQuests: user.dailyQuests,
                xp: user.xp,
                level: user.level
            });
        } catch (error) {
            res.status(500).json({ message: 'Error submitting feedback' });
        }
    };

    async getUserSearch(req: Request, res: Response) {
        try {
            const users = await User.find().select('username avatarId');
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error searching users' });
        }
    };
}
