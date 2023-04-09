import { Router } from 'express';

import TaskController from '../controllers/task.controller';
import authMiddleware from '../middlewares/auth.middleware';

const taskRoutes = Router();

taskRoutes.get('/tasks-paginated', TaskController.get);

taskRoutes.post('/task', TaskController.add);
taskRoutes.put('/user', TaskController.update);

taskRoutes.get('/task/:id', TaskController.find);
taskRoutes.post('/task/:id', TaskController.delete);

export { taskRoutes };
