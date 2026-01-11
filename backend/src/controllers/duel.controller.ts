import type { Request, Response } from 'express';
import User from '../models/User.js';
import Duel from '../models/Duel.js';

export class DuelController {
    constructor() { }

    async createDuel(req: Request, res: Response) {
        try {
            const challengerId = (req as any).user.id;
            const { opponentId, metric, wager, durationDays } = req.body; // durationDays e.g. 7

            // Wager Check
            const challenger = await User.findById(challengerId);
            if (wager > 0) {
                if (!challenger || challenger.currency < wager) {
                    return res.status(400).json({ message: 'Insufficient funds for wager' });
                }
                challenger.currency -= wager;
                await challenger.save();
            }

            const duel = await Duel.create({
                challengerId,
                opponentId,
                metric,
                wager,
                durationDays: durationDays || 1,
                status: 'PENDING',
            });

            res.json({ message: 'Duel challenged!', duel });

        } catch (error) {
            res.status(500).json({ message: 'Error creating duel' });
        }
    };

    async respondToDuel(req: Request, res: Response) {
        try {
            const userId = (req as any).user.id;
            const { duelId, response } = req.body; // response: 'ACCEPT' | 'DECLINE'

            const duel = await Duel.findById(duelId);
            if (!duel) return res.status(404).json({ message: 'Duel not found' });
            if (duel.opponentId.toString() !== userId) return res.status(403).json({ message: 'Not your duel' });
            if (duel.status !== 'PENDING') return res.status(400).json({ message: 'Duel not pending' });

            if (response === 'DECLINE') {
                duel.status = 'DECLINED';
                await duel.save();

                // Refund Challenger
                if (duel.wager > 0) {
                    const challenger = await User.findById(duel.challengerId);
                    if (challenger) {
                        challenger.currency += duel.wager;
                        await challenger.save();
                    }
                }
                return res.json({ message: 'Duel declined' });
            }

            if (response === 'ACCEPT') {
                // Check Opponent Funds
                if (duel.wager > 0) {
                    const opponent = await User.findById(userId);
                    if (!opponent || opponent.currency < duel.wager) {
                        return res.status(400).json({ message: 'Insufficient funds to accept' });
                    }
                    opponent.currency -= duel.wager;
                    await opponent.save();
                }

                // Snapshot Start Values
                // We need to fetch current values for metric (assume XP for now)
                const challenger = await User.findById(duel.challengerId);
                const opponent = await User.findById(userId);

                if (!challenger || !opponent) return res.status(404).json({ message: 'User not found' });

                duel.status = 'ACTIVE';
                duel.startTime = new Date();

                // Calc End Time
                const days = duel.durationDays || 1;
                const durationMs = days * 24 * 60 * 60 * 1000;
                duel.endTime = new Date(Date.now() + durationMs);

                // Set Snapshots
                // Metric generic handler:
                if (duel.metric === 'XP') {
                    duel.challengerStartValue = challenger.xp;
                    duel.opponentStartValue = opponent.xp;
                } else {
                    // Default to 0 if we can't track yet (e.g. STEPS?)
                    duel.challengerStartValue = 0;
                    duel.opponentStartValue = 0;
                }

                await duel.save();
                return res.json({ message: 'Duel started!', duel });
            }

        } catch (error) {
            res.status(500).json({ message: 'Error responding to duel' });
        }
    };

    async getDuels(req: Request, res: Response) {
        try {
            const userId = (req as any).user.id;
            const duels = await Duel.find({
                $or: [{ challengerId: userId }, { opponentId: userId }],
                // Fetch PENDING, ACTIVE, and recent COMPLETED? Just all for now or filter in frontend
            })
                .sort({ createdAt: -1 })
                .populate('challengerId', 'username avatarId xp')
                .populate('opponentId', 'username avatarId xp');

            res.json(duels);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching duels' });
        }
    };

    // --- CRON / RESOLUTION LOGIC ---
    async resolveExpiredDuels() {
        // Ideally user-triggered or cron
        try {
            const now = new Date();
            const expiredDuels = await Duel.find({
                status: 'ACTIVE',
                endTime: { $lt: now }
            });

            for (const duel of expiredDuels) {
                await this.resolveSingleDuel(duel);
            }

            if (expiredDuels.length > 0) {
                console.log(`Resolved ${expiredDuels.length} duels.`);
            }
        } catch (error) {
            console.error("Error resolving duels:", error);
        }
    };

    async resolveSingleDuel(duel: any) {
        const challenger = await User.findById(duel.challengerId);
        const opponent = await User.findById(duel.opponentId);

        if (!challenger || !opponent) {
            duel.status = 'COMPLETED'; // Force close
            await duel.save();
            return;
        }

        // Calculate Gain
        // Assume XP
        const challengerGain = challenger.xp - (duel.challengerStartValue || 0);
        const opponentGain = opponent.xp - (duel.opponentStartValue || 0);

        let winnerId = null;
        let isTie = false;

        if (challengerGain > opponentGain) {
            winnerId = challenger._id;
        } else if (opponentGain > challengerGain) {
            winnerId = opponent._id;
        } else {
            isTie = true;
        }

        if (isTie) {

            challenger.currency += duel.wager;
            opponent.currency += duel.wager;

            duel.status = 'TIED'; // or COMPLETED
        } else {
            duel.winnerId = winnerId;
            duel.status = 'COMPLETED';

            // Winner gets Pot (wager * 2)
            const winner = String(winnerId) === String(challenger._id) ? challenger : opponent;
            winner.currency += (duel.wager * 2);

            // Save winner
            await winner.save(); // We save inside block to handle refund/win separately
        }

        // Save all
        if (isTie) {
            await challenger.save();
            await opponent.save();
        }
        await duel.save();
    };
}
