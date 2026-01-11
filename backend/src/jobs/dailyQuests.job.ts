import cron from 'node-cron';
import User from '../models/User.js';
import Quest from '../models/Quest.js';
import { v4 as uuidv4 } from 'uuid';

export const initDailyQuestsJob = () => {
    // Run every day at midnight (00:00)
    cron.schedule('0 0 * * *', async () => {
        console.log('Running daily quests cron job...');
        await Quest.deleteMany({ type: 'DAILY' });

        try {
            // 1. Generate Daily Quests

            // Task 1: Complete randomly 1-5 daily puzzles (2 XP each)
            const puzzleCount = Math.floor(Math.random() * 5) + 1;
            const puzzleXP = puzzleCount * 2;
            const puzzleQuestId = `daily_puzzle_${new Date().toISOString().split('T')[0]}`;

            let puzzleQuest = await Quest.findOne({ questId: puzzleQuestId });
            if (!puzzleQuest) {
                puzzleQuest = await Quest.create({
                    questId: puzzleQuestId,
                    title: `Complete ${puzzleCount} Daily Puzzle${puzzleCount > 1 ? 's' : ''}`,
                    description: `Solve ${puzzleCount} puzzle${puzzleCount > 1 ? 's' : ''} to earn XP!`,
                    xpReward: puzzleXP,
                    type: 'DAILY',
                    criteria: {
                        type: 'PUZZLES_COMPLETED',
                        target: puzzleCount
                    }
                });
            }

            // Task 2: Complete 1 Level (5 XP)
            const levelQuestId = `daily_level_${new Date().toISOString().split('T')[0]}`;
            let levelQuest = await Quest.findOne({ questId: levelQuestId });
            if (!levelQuest) {
                levelQuest = await Quest.create({
                    questId: levelQuestId,
                    title: 'Complete 1 Level',
                    description: 'Finish any level to progress.',
                    xpReward: 5,
                    type: 'DAILY',
                    criteria: {
                        type: 'LEVELS_COMPLETED',
                        target: 1
                    }
                });
            }

            // Task 3: Give 1 Feedback (7 XP)
            const feedbackQuestId = `daily_feedback_${new Date().toISOString().split('T')[0]}`;
            let feedbackQuest = await Quest.findOne({ questId: feedbackQuestId });
            if (!feedbackQuest) {
                feedbackQuest = await Quest.create({
                    questId: feedbackQuestId,
                    title: 'Give Feedback',
                    description: 'Share your thoughts with us.',
                    xpReward: 5,
                    type: 'DAILY',
                    criteria: {
                        type: 'FEEDBACK_GIVEN',
                        target: 1
                    }
                });
            }

            const newDailyQuests = [
                { questId: puzzleQuest._id, progress: 0, isClaimed: false, assignedAt: new Date() },
                { questId: levelQuest._id, progress: 0, isClaimed: false, assignedAt: new Date() },
                { questId: feedbackQuest._id, progress: 0, isClaimed: false, assignedAt: new Date() }
            ];

            // 2. Assign to ALL Users
            await User.updateMany({}, {
                $set: { dailyQuests: newDailyQuests }
            });

            console.log(`Assigned daily quests to all users. Puzzle Count: ${puzzleCount}, Total XP: ${puzzleXP + 5 + 5}`);

        } catch (error) {
            console.error('Error in daily quests cron job:', error);
        }
    });
};
