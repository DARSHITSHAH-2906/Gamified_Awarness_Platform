import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Region from '../models/Region.js';
import Level from '../models/Level.js';
import connectDB from '../config/db.js';
import SEED_DATA from './data.js';

dotenv.config();

const seed = async () => {
    try {
        await connectDB();
        console.log('Connected to DB');

        console.log('Clearing old data...');
        await Region.deleteMany({});
        await Level.deleteMany({});

        console.log('Seeding data...');
        // ... (Region and Level seeding)

        for (const regionData of SEED_DATA) {
            // ... (Region creation)
            const region = new Region({
                regionId: regionData.id,
                title: regionData.title,
                description: regionData.description,
                themeColor: regionData.themeColor,
                order: regionData.order
            });
            await region.save();
            console.log(`Created Region: ${region.title}`);

            // Create Levels
            let levelOrder = 1;
            for (const levelData of regionData.levels) {
                const level = new Level({
                    levelId: levelData.levelId,
                    title: levelData.title,
                    regionId: regionData.id,
                    difficulty: 'EASY', // Default
                    order: levelOrder++,
                    x: levelData.x,
                    y: levelData.y,
                    games: (levelData as any).games, // Add games from seed data
                    config: {
                        gridSize: 10,
                        timeLimit: 120,
                        minStarsThreshold: 1
                    }
                });
                await level.save();
            }
            console.log(`Created ${regionData.levels.length} levels for ${region.title}`);
        }

        console.log('Seeding Complete! 🌱');
        process.exit(0);

    } catch (error) {
        console.error('Seeding Error:', error);
        process.exit(1);
    }
};

seed();
