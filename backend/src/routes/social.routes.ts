import express, { Router } from 'express';
import { SocialController } from '../controllers/social.controller.js';
import { UserController } from '../controllers/user.controller.js';
import { auth } from '../middleware/auth.js';
import { QuestController } from '@/controllers/quest.controller.js';


export class SocialRouter{
    public router : Router;
    private socialController : SocialController;
    private userController : UserController;
    private questController : QuestController;
    constructor(){
        this.router = Router();
        this.socialController = new SocialController();
        this.questController = new QuestController();
        this.userController = new UserController(this.questController);
        this.initializeRoutes();
    }
    private initializeRoutes(){
        this.router.post('/kudos', auth, this.socialController.sendKudos.bind(this.socialController));
        this.router.post('/gift', auth, this.socialController.sendGift.bind(this.socialController));
        this.router.get('/history', auth, this.socialController.getSocialHistory.bind(this.socialController));
        this.router.get('/search', auth, this.userController.getUserSearch.bind(this.userController));
    }
}
