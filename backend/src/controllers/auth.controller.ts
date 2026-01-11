import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { generateToken } from "../services/generateToken"

export class AuthController {
    constructor() { }

    async register(req: Request, res: Response) {
        try {
            const { username, email, password, avatarId } = req.body;

            // Check if user exists
            const existingUser = await User.findOne({ $or: [{ email }, { username }] });
            if (existingUser) {
                return res.status(400).json({ status: 'ERROR', message: 'User already exists' });
            }

            // Hash password
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password, salt);

            // Create user
            const newUser = new User({
                username,
                email,
                password: passwordHash,
                avatarId: avatarId || 'adventurer',
                progress: [], // Start empty
                totalStars: 0
            });

            await newUser.save();

            // Create Token
            generateToken({ id: newUser._id }, res)
            

            res.status(201).json({
                status: 'OK',
                message: 'User registered successfully',
                user: {
                    id: newUser._id,
                    username: newUser.username,
                    email: newUser.email,
                    avatarId: newUser.avatarId,
                    totalStars: newUser.totalStars,
                    currentRegion: newUser.currentRegion,
                    badges: newUser.badges,
                    dailyQuests: newUser.dailyQuests,
                    xp: newUser.xp,
                    level: newUser.level,
                    progress: newUser.progress,
                    streak: newUser.streak,
                    accuracy: newUser.accuracy,
                    currency: newUser.currency
                }
            });
        } catch (error) {
            console.error('Register Error:', error);
            res.status(500).json({ status: 'ERROR', message: 'Server error' });
        }
    };

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            // Check user
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            // Check password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            // Streak Logic
            const now = new Date();
            const lastLogin = user.streak?.lastLogin ? new Date(user.streak.lastLogin) : new Date(0);

            // Reset time portion for day comparison
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const lastLoginDay = new Date(lastLogin.getFullYear(), lastLogin.getMonth(), lastLogin.getDate());

            // Calculate difference in days
            const diffTime = Math.abs(today.getTime() - lastLoginDay.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
                // Consecutive day login
                user.streak = {
                    count: (user.streak?.count || 0) + 1,
                    lastLogin: now
                };
            } else if (diffDays > 1) {
                // Missed a day or more
                user.streak = {
                    count: 1,
                    lastLogin: now
                };
            } else {
                // Same day login, just update time
                if (!user.streak) {
                    user.streak = { count: 1, lastLogin: now };
                } else {
                    user.streak.lastLogin = now;
                }
            }
            await user.save();

            // Create Token
            generateToken({ id: user._id }, res);

            let xp = user.progress.reduce((acc: number, curr: any) => acc + curr.xpEarned, 0);
            xp += user.dailyQuests.reduce((acc: number, curr: any) => acc + curr.xpReward, 0);

            res.json({
                status: 'OK',
                message: 'Login successful',
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    avatarId: user.avatarId,
                    totalStars: user.totalStars,
                    currentRegion: user.currentRegion, // Ensure these fields exist in login response too
                    badges: user.badges,
                    dailyQuests: user.dailyQuests,
                    xp: xp,
                    level: user.level,
                    progress: user.progress,
                    streak: user.streak,
                    accuracy: user.accuracy
                },
            });
        } catch (error) {
            console.error('Login Error:', error);
            res.status(500).json({ status: 'ERROR', message: 'Server error' });
        }
    };

    async logout(req: Request, res: Response) {
        try {
            res.clearCookie('token');
            res.status(200).json({
                status: 'OK',
                message: 'Logout successful',
            });
        } catch (error) {
            console.error('Logout Error:', error);
            res.status(500).json({ status: 'ERROR', message: 'Server error' });
        }
    }
    async verifyToken(req: Request, res: Response) {
        try {
            const userId = (req as any).user.id;
            const user = await User.findById(userId).select('-password -__v');

            if (!user) {
                return res.status(404).json({ status: 'ERROR', message: 'User not found' });
            }


            res.json({
                status: 'OK',
                message: 'User found',
                user
            });
        } catch (error) {
            console.error('Verify Token Error:', error);
            res.status(500).json({ status: 'ERROR', message: 'Server error' });
        }
    };

    async getMe(req: Request, res: Response) {
        try {
            const userId = (req as any).user.id;
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ status: 'ERROR', message: 'User not found' });
            }

            res.json({
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    avatarId: user.avatarId,
                    totalStars: user.totalStars,
                    currentRegion: user.currentRegion,
                    badges: user.badges,
                    dailyQuests: user.dailyQuests,
                    xp: user.xp,
                    level: user.level,
                    progress: user.progress,
                    streak: user.streak,
                    accuracy: user.accuracy,
                    currency: user.currency
                }
            });
        } catch (error) {
            console.error('Get Me Error:', error);
            res.status(500).json({ status: 'ERROR', message: 'Server error' });
        }
    };
}