import express, { type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import {AuthRouter} from './routes/auth.routes.js';
import {GameRouter} from './routes/game.routes.js';
import {SocialRouter} from './routes/social.routes.js';
import {DuelRouter} from './routes/duel.routes.js';
import { initDailyQuestsJob } from './jobs/dailyQuests.job.js';
import cookieParser from "cookie-parser";
dotenv.config();

// Initialize Cron Jobs
initDailyQuestsJob();
// Run once on startup to ensure quests exist during dev

export class App{
    private app : express.Application;
    private authRouter : AuthRouter;
    private gameRouter : GameRouter;
    private socialRouter : SocialRouter;
    private duelRouter : DuelRouter;
    constructor(){
        this.app = express();
        this.authRouter = new AuthRouter();
        this.gameRouter = new GameRouter();
        this.socialRouter = new SocialRouter();
        this.duelRouter = new DuelRouter();
    }
    private async initializeRoutes(){
        this.app.use('/api/auth', this.authRouter.router);
        this.app.use('/api/game', this.gameRouter.router);
        this.app.use('/api/social', this.socialRouter.router);
        this.app.use('/api/duels', this.duelRouter.router);
        await connectDB();
    }
    public async startServer(){
        const PORT = process.env.PORT || 5000;
        
        // Middleware
        this.app.use(cors({
            origin: ['http://localhost:5173', 'http://localhost:3000'],
            credentials: true
        }));
        
        this.app.use(express.json());
        this.app.use(cookieParser());
        this.initializeRoutes();
        
        this.app.get('/', (req: Request, res: Response) => {
            res.json({ message: 'Welcome to EduRights API 🚀' });
        });

        this.app.get('/health', (req: Request, res: Response) => {
            res.json({ status: 'OK', timestamp: new Date() });
        });

        // Start Server
        this.app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    }
}

const app = new App();
await app.startServer.bind(app)();

