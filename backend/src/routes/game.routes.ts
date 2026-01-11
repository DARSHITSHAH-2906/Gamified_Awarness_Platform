import { auth } from '../middleware/auth.js';
import { LevelController } from '@/controllers/level.controller.js';
import { QuestController } from '@/controllers/quest.controller.js';
import { UserController } from '@/controllers/user.controller.js';
import express, { Router } from 'express';

export class GameRouter{
    public router : Router;
    private levelController : LevelController;
    private questController : QuestController;
    private userController : UserController;
    constructor(){
        this.router = Router();
        this.questController = new QuestController();
        this.levelController = new LevelController(this.questController);
        this.userController = new UserController(this.questController);
        this.initializeRoutes();
    }

    private initializeRoutes(){
        this.router.get('/map', this.levelController.getWorldMap.bind(this.levelController));
        this.router.get('/progress', auth, this.userController.getUserProgress.bind(this.userController));
        this.router.post('/level/complete', auth, this.levelController.completeLevel.bind(this.levelController));
        this.router.get('/level/:id', auth, this.levelController.getLevel.bind(this.levelController)); // New route
        this.router.get('/leaderboard', this.userController.getLeaderboard.bind(this.userController));
        this.router.get('/daily-quests', auth, this.questController.getDailyQuests.bind(this.questController));
        this.router.post('/feedback', auth, this.userController.submitFeedback.bind(this.userController));
    }
}