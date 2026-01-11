import type { Request, Response } from 'express';
import User from '../models/User.js';
import Quest from '../models/Quest.js';

export class QuestController {
    constructor() { }

    async checkAndAdvanceQuest(user: any, criteriaType: string, amount: number = 1) {
        let questUpdated = false;
        const currentQuestIds = user.dailyQuests.map((q: any) => q.questId);
        // Find quests by _id using the stored ObjectIds
        const questDefs = await Quest.find({ _id: { $in: currentQuestIds } });

        for (const uq of user.dailyQuests) {
            if (uq.isClaimed) continue;

            // Compare ObjectIds via string conversion
            const def = questDefs.find(d => d._id.toString() === uq.questId.toString());
            if (!def) continue;

            if (def.criteria.type === criteriaType) {
                uq.progress += amount;

                if (uq.progress >= def.criteria.target && !uq.isClaimed) {
                    uq.isClaimed = true;
                    user.xp += def.xpReward;
                    questUpdated = true;
                } else {
                    questUpdated = true;
                }
            }
        }
        return questUpdated;
    };

    async getDailyQuests(req: Request, res: Response) {
        try {
            const userId = (req as any).user.id;
            const user = await User.findById(userId);

            if (!user) return res.status(404).json({ message: 'User not found' });

            const currentQuestIds = user.dailyQuests.map((q: any) => q.questId);
            const currentQuestDefs = await Quest.find({ _id: { $in: currentQuestIds } });

            const today = new Date();
            const hasDailyForToday = user.dailyQuests.some((uq: any) => {
                const def = currentQuestDefs.find(d => d._id.toString() === uq.questId.toString());
                if (def?.type !== 'DAILY') return false;
                const assigned = new Date(uq.assignedAt);
                return assigned.getDate() === today.getDate() && assigned.getMonth() === today.getMonth() && assigned.getFullYear() === today.getFullYear();
            });

            if (!hasDailyForToday) {
                let newQuestList = user.dailyQuests.filter((uq: any) => {
                    const def = currentQuestDefs.find(d => d._id.toString() === uq.questId.toString());
                    return def && def.type !== 'DAILY';
                });

                const newDailyQuests = await Quest.aggregate([{ $match: { type: 'DAILY' } }, { $sample: { size: 3 } }]);

                const newAssigned = newDailyQuests.map(q => ({
                    questId: q._id, // Store _id
                    xpReward: q.xpReward || 50,
                    progress: 0,
                    isClaimed: false,
                    assignedAt: new Date()
                }));

                user.dailyQuests = [...newQuestList, ...newAssigned];
                await user.save();
            }

            const globalQuests = await Quest.find({ type: { $in: ['WEEKLY', 'ACHIEVEMENT'] } });
            let addedNew = false;
            for (const gq of globalQuests) {
                const exists = user.dailyQuests.some((uq: any) => uq.questId.toString() === gq._id.toString());
                if (!exists) {
                    user.dailyQuests.push({
                        questId: gq._id,
                        xpReward: gq.xpReward,
                        progress: 0,
                        isClaimed: false,
                        assignedAt: new Date()
                    });
                    addedNew = true;
                }
            }

            if (addedNew) await user.save();

            const finalQuestIds = user.dailyQuests.map((q: any) => q.questId);
            const finalDefs = await Quest.find({ _id: { $in: finalQuestIds } });

            const detailedQuests = user.dailyQuests.map((uq: any) => {
                const def = finalDefs.find(d => d._id.toString() === uq.questId.toString());
                if (!def) return null;
                return {
                    questId: def.questId, // Return STRING ID to frontend for consistency
                    title: def.title,
                    description: def.description,
                    xpReward: def.xpReward,
                    progress: uq.progress,
                    max: def.criteria.target,
                    icon: def.criteria.type,
                    type: def.type
                };
            }).filter((q: any) => q !== null);
            res.json(detailedQuests);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching daily quests' });
        }
    };
}
