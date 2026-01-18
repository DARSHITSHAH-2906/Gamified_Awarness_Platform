import { Request, Response } from 'express';
import User from '../models/User.js';
import Challenge from '../models/Challenge.js';
import Level from '../models/Level.js';
import { QuestController } from "../controllers/quest.controller.js";
import Region from '../models/Region.js';

export class LevelController {
    constructor(private readonly questController: QuestController) { }

    calculateStars(xpEarned: number): number {
        if (xpEarned < 10) { return 0; }
        else if (xpEarned >= 10 && xpEarned < 20) { return 1; }
        else if (xpEarned >= 20 && xpEarned < 30) { return 2; }
        else { return 3; }
    }

    async completeLevel(req: Request, res: Response) {
        try {
            const userId = (req as any).user.id;
            const { levelId, solvedPuzzles } = req.body;

            const user = await User.findById(userId);
            if (!user) return res.status(404).json({ message: 'User not found' });

            // 1. Resolve Level ID (Body levelId is now the ObjectId)
            let levelDoc;
            try {
                levelDoc = await Level.findById(levelId);
            } catch (e) {
                return res.status(404).json({ message: 'Invalid Level ID Format' });
            }

            if (!levelDoc) return res.status(404).json({ message: 'Level not found' });
            const levelObjectId = levelDoc._id;

            // 2. Find existing progress
            let levelProgress = user.progress.find((p: any) => p.levelId.toString() === levelObjectId.toString());

            const foundChallenges = await Challenge.find({
                _id: { $in: solvedPuzzles }
            });

            // Create a Set of ALREADY solved ObjectIds (as strings for comparison)
            const previousSolvedSet = new Set(
                levelProgress
                    ? (levelProgress.solvedChallenges || []).map((id: any) => id.toString())
                    : []
            );

            let newlyEarnedXp = 0;
            const newSolvedObjectIds: any[] = [];

            // Loop through the REAL documents we found in the DB
            for (const challenge of foundChallenges) {
                const challengeObjIdStr = challenge._id.toString();
                // Check if this ObjectId is already in the user's progress
                if (!previousSolvedSet.has(challengeObjIdStr)) {
                    // It is NEW! Add the ObjectId to our list to save
                    newSolvedObjectIds.push(challenge._id);

                    newlyEarnedXp += challenge.xp;
                }
            }

            if (levelProgress) {
                levelProgress.xpEarned = (levelProgress.xpEarned || 0) + newlyEarnedXp;
                levelProgress.stars = this.calculateStars(levelProgress.xpEarned);

                // Push the actual ObjectIds
                newSolvedObjectIds.forEach(id => levelProgress?.solvedChallenges.push(id));

                if (levelProgress.status !== 'completed' && levelProgress.xpEarned >= 30) {
                    levelProgress.status = 'completed';
                    levelProgress.completedAt = new Date();
                }
            } else {
                user.progress.push({
                    levelId: levelObjectId,
                    status: newlyEarnedXp >= 30 ? 'completed' : 'unlocked',
                    stars: this.calculateStars(newlyEarnedXp),
                    xpEarned: newlyEarnedXp,
                    solvedChallenges: newSolvedObjectIds, // Storing ObjectIds now
                    completedAt: newlyEarnedXp >= 30 ? new Date() : undefined
                });
                // Update reference
                levelProgress = user.progress[user.progress.length - 1];
            }

            user.xp += newlyEarnedXp;
            user.level = Math.floor(user.xp / 30) + 1;

            // Level Unlock Logic
            let isNewLevelUnlocked = false;
            // Completion threshold is now 30
            if (levelProgress.xpEarned >= 30) {
                // Determine next level by incrementing the current levelNumber
                const currentLevelNumber = levelDoc.levelNumber;
                const nextLevelDoc = await Level.findOne({ levelNumber: currentLevelNumber + 1 });

                if (nextLevelDoc) {
                    const alreadyUnlocked = user.progress.some((p: any) => p.levelId.toString() === nextLevelDoc._id.toString());
                    if (!alreadyUnlocked) {
                        user.progress.push({
                            levelId: nextLevelDoc._id,
                            status: 'unlocked',
                            stars: 0,
                            xpEarned: 0,
                            solvedChallenges: []
                        });
                        isNewLevelUnlocked = true;
                        levelProgress = user.progress[user.progress.length - 1];
                    }
                }
            }

            // Note: For PUZZLES_COMPLETED, we use the count of NEWLY solved IDs
            if (newSolvedObjectIds.length > 0) {
                await this.questController.checkAndAdvanceQuest(user, 'PUZZLES_COMPLETED', newSolvedObjectIds.length);
            }
            // Only trigger level complete quest if this was the first time completion
            if (newSolvedObjectIds.length > 0 && levelProgress.status === 'completed') {
                await this.questController.checkAndAdvanceQuest(user, 'LEVELS_COMPLETED', 1);
            }

            await user.save();

            res.json({
                message: levelProgress.xpEarned >= 30 ? 'Level Completed' : `Need ${30 - levelProgress.xpEarned} more XP to complete this level`,
                progress: user.progress,
                xp: user.xp,
            });

        } catch (error) {
            console.error("Complete Level Error", error);
            res.status(500).json({ message: 'Error updating progress' });
        }
    }

    async getLevel(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const level = await Level.findById(id).lean(); // Using _id
            if (!level) return res.status(404).json({ message: 'Level not found' });

            const challenges = await Challenge.find({ levelId: id });

            res.json({
                ...level,
                challenges
            });
        } catch (error) {
            res.status(500).json({ message: 'Error fetching level' });
        }
    };

    async getWorldMap(req: Request, res: Response) {
        try {
            const regions = await Region.find().sort({ order: 1 });
            const levels = await Level.find().sort({ order: 1 });

            const mapData = regions.map(region => {
                return {
                    ...region.toObject(),
                    levels: levels.filter(l => l.regionId.toString() === region._id.toString())
                };
            });

            res.json(mapData);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching map data' });
        }
    };
}
