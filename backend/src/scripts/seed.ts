import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Region from '../models/Region.js';
import Level from '../models/Level.js';
import Challenge from '../models/Challenge.js';
import connectDB from '../config/db.js';
import SEED_DATA from './data.js';

dotenv.config();

const seed = async () => {
    try {
        await connectDB();
        console.log('Connected to DB');

        console.log('Clearing old data...');
        try {

        } catch (e) {
            console.log(e);
        }

        await Region.deleteMany({});
        await Level.deleteMany({});
        await Challenge.deleteMany({});

        console.log('Seeding data...');

        let globalLevelCounter = 1;

        for (const regionData of SEED_DATA) {
            const region = new Region({
                title: regionData.title,
                description: regionData.description,
                themeColor: regionData.themeColor,
                bgGradient: regionData.bgGradient,
                order: regionData.order,
                levels: [] // Initialize empty array
            });
            await region.save();
            console.log(`Created Region: ${region.title}`);

            const regionLevels: mongoose.Types.ObjectId[] = [];

            for (const levelData of regionData.levels) {
                const level = new Level({
                    levelNumber: globalLevelCounter++,
                    title: levelData.title,
                    regionId: region._id,
                    difficulty: 'EASY',
                    order: globalLevelCounter - 1,
                    x: levelData.x,
                    y: levelData.y,
                    config: {
                        gridSize: 10,
                        timeLimit: 120,
                        minStarsThreshold: 1
                    }
                });
                await level.save();
                regionLevels.push(level._id as mongoose.Types.ObjectId);

                // Seed Challenges for this level
                // Seed Challenges for this level
                const challengesData = (levelData as any).challenges;

                if (challengesData && Array.isArray(challengesData)) {
                    for (const cData of challengesData) {
                        // Extract specific top-level fields, keep rest in 'data'
                        // Note: We need to ensure 'data' in schema contains the specific game content.
                        // The user's JSON flattens it. We can store the *entire* cData as data, or separate it.
                        // Storing entire object in 'data' is safer for now alongside specific fields.
                        const { type, gameType, lawId, difficulty, badge, order, xp } = cData;

                        const challenge = new Challenge({
                            type: type,
                            gameType: gameType || type,
                            levelId: level._id,
                            lawId,
                            difficulty,
                            badge,
                            order,
                            xp: xp || 10,
                            data: cData // Store full object in mixed field for flexibility
                        });
                        await challenge.save();
                    }
                } else {
                    // Legacy 'games' object support
                    const gamesData = (levelData as any).games;
                    if (gamesData) {
                        for (const [gameType, challenges] of Object.entries(gamesData)) {
                            if (Array.isArray(challenges)) {
                                for (const challengeItem of challenges) {
                                    const challenge = new Challenge({
                                        type: gameType,
                                        gameType: gameType, // Fallback
                                        levelId: level._id,
                                        data: challengeItem,
                                        xp: challengeItem.xp || 10
                                    });
                                    await challenge.save();
                                }
                            }
                        }
                    }
                }
            }

            // Update region with level IDs
            region.levels = regionLevels as any;
            await region.save();

            console.log(`Linked ${regionLevels.length} levels to Region: ${region.title}`);
        }

        console.log('Seeding Complete! 🌱');
        process.exit(0);

    } catch (error) {
        console.error('Seeding Error:', error);
        console.error((error as any).stack);
        process.exit(1);
    }
};

seed();
