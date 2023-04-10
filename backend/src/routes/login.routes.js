import { Router } from 'express';

import loginController from '../controllers/login.controller';
import authMiddleware from '../middlewares/auth.middleware';

const loginRoutes = Router();

loginRoutes.post('/login', loginController.login);
loginRoutes.get('/logout', authMiddleware, loginController.logout); //wont need to invalidate token since using cookie for auth
loginRoutes.get('/test', loginController.test);

export { loginRoutes };
