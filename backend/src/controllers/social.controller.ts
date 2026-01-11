import type { Request, Response } from 'express';
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';

export class SocialController {
    constructor() { }

    async sendKudos(req: Request, res: Response) {
        try {
            const senderId = (req as any).user.id;
            const { recipientId, assetType, message } = req.body;

            if (senderId === recipientId) return res.status(400).json({ message: 'Cannot self-kudos' });

            const sender = await User.findById(senderId);
            const recipient = await User.findById(recipientId);

            if (!sender || !recipient) return res.status(404).json({ message: 'User not found' });

            // Check Daily Limit (reset if new day)
            const today = new Date();
            const lastKudos = new Date(sender.social.lastKudosDate);
            if (lastKudos.getDate() !== today.getDate() || lastKudos.getMonth() !== today.getMonth()) {
                sender.social.dailyKudosCount = 0;
                sender.social.lastKudosDate = today;
            }

            if (sender.social.dailyKudosCount >= 5) {
                return res.status(403).json({ message: 'Daily kudos limit reached' });
            }

            // Execute
            sender.social.dailyKudosCount += 1;
            recipient.reputation += 1; // Basic reputation formula

            await sender.save();
            await recipient.save();

            await Transaction.create({
                senderId,
                recipientId,
                type: 'KUDOS',
                assetType, // e.g. 'high-five'
                message
            });

            res.json({ message: 'Kudos sent!', dailyCount: sender.social.dailyKudosCount });

        } catch (error) {
            res.status(500).json({ message: 'Error sending kudos' });
        }
    };

    async sendGift(req: Request, res: Response) {
        try {
            const senderId = (req as any).user.id;
            const { recipientId, assetType, amount, message } = req.body; // assetType='gold-coin', amount=100

            if (senderId === recipientId) return res.status(400).json({ message: 'Cannot gift self' });
            if (!amount || amount <= 0) return res.status(400).json({ message: 'Invalid amount' });

            const sender = await User.findById(senderId);
            const recipient = await User.findById(recipientId);

            if (!sender || !recipient) return res.status(404).json({ message: 'User not found' });

            if (sender.currency < amount) {
                return res.status(400).json({ message: 'Insufficient funds' });
            }

            sender.currency -= amount;
            recipient.currency += amount;

            await sender.save();
            await recipient.save();

            await Transaction.create({
                senderId,
                recipientId,
                type: 'GIFT',
                assetType,
                amount,
                message
            });

            res.json({ message: 'Gift sent!', newBalance: sender.currency });

        } catch (error) {
            res.status(500).json({ message: 'Error sending gift' });
        }
    };

    async getSocialHistory(req: Request, res: Response) {
        try {
            const userId = (req as any).user.id;
            // Get logs where I am sender or recipient
            const history = await Transaction.find({
                $or: [{ senderId: userId }, { recipientId: userId }]
            })
                .sort({ timestamp: -1 })
                .populate('senderId', 'username avatarId')
                .populate('recipientId', 'username avatarId')
                .limit(20);

            res.json(history);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching history' });
        }
    };
}
