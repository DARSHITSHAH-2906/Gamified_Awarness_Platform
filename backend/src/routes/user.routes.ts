import express, { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';
import { QuestController } from '../controllers/quest.controller.js';
import { auth } from '../middleware/auth.js';

export class UserRouter {
    public router: Router;
    private userController: UserController;
    private questController: QuestController;

    constructor() {
        this.router = Router();
        this.questController = new QuestController();
        this.userController = new UserController(this.questController);
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/profile', auth, this.userController.getProfile.bind(this.userController));
        this.router.put('/profile', auth, this.userController.updateProfile.bind(this.userController));
    }
}
