import express, { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { auth } from '../middleware/auth.js';

export class AuthRouter {
  public router: Router;
  private authController: AuthController;

  constructor() {
    this.router = express.Router();
    this.authController = new AuthController();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/register', this.authController.register.bind(this.authController));
    this.router.post('/login', this.authController.login.bind(this.authController));
    this.router.get('/verify', auth, this.authController.verifyToken.bind(this.authController));
    this.router.get('/me', auth, this.authController.getMe.bind(this.authController));
    this.router.get('/logout', auth, this.authController.logout.bind(this.authController));
  }
}
