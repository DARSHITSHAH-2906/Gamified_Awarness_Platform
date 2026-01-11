import express, { Router } from 'express';
import { DuelController } from '../controllers/duel.controller.js';
import { auth } from '../middleware/auth.js';

export class DuelRouter {
    public router: Router;
    private duelController: DuelController;

    constructor() {
        this.router = express.Router();
        this.duelController = new DuelController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/create', auth, this.duelController.createDuel.bind(this.duelController));
        this.router.post('/respond', auth, this.duelController.respondToDuel.bind(this.duelController));
        this.router.get('/', auth, this.duelController.getDuels.bind(this.duelController));
    }
}