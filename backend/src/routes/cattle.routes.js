import { Router } from 'express';

import CattleController from '../controllers/cattle.controller';
import authMiddleware from '../middlewares/auth.middleware';

const cattleRoutes = Router();

cattleRoutes.get('/cattle-paginated', CattleController.get);

cattleRoutes.post('/cattle', CattleController.add);
cattleRoutes.put('/cattle', CattleController.update);

cattleRoutes.get('/cattle/:id', CattleController.find);
cattleRoutes.post('/task/:id', CattleController.delete);

export { cattleRoutes };
