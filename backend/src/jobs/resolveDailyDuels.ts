import {DuelController} from '@/controllers/duel.controller';
import cron from 'node-cron';

const duelController = new DuelController();

// Run every hour to check for expired duels
cron.schedule('0 * * * *', () => {
    console.log('Running duel resolution job...');
    duelController.resolveExpiredDuels();
});
// Run once on startup to catch up
duelController.resolveExpiredDuels();