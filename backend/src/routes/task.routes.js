import { Router } from 'express';

import TaskController from '../controllers/task.controller';
import authMiddleware from '../middlewares/auth.middleware';

const taskRoutes = Router();

taskRoutes.get('/tasks-paginated', TaskController.get); //listing page
taskRoutes.post('/task', TaskController.addTask); //create
taskRoutes.put('/task', TaskController.update); //update
taskRoutes.get('/task/:id', TaskController.find); //get
taskRoutes.post('/archive-task/:id', TaskController.delete); //delete (not using a delete api because i am soft deleting it manually)

export { taskRoutes };
