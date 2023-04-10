const ApiUrl = process.env.NEXT_PUBLIC_API_URL;
const UIbaseURL = process.env.NEXT_PUBLIC_UI_URL;
const S3_BASE_URL = process.env.NEXT_PUBLIC_S3_BASE_URL;

import Cookies from 'universal-cookie';
import * as HttpService from 'services/http.service';

// taskRoutes.get('/tasks-paginated', TaskController.get); //listing page
// taskRoutes.post('/task', TaskController.addTask); //create
// taskRoutes.put('/task', TaskController.update); //update
// taskRoutes.get('/task/:id', TaskController.find); //get
// taskRoutes.post('/archive-task/:id', TaskController.delete); //delete (not using a delete api because i am soft deleting it manually)

export const createTask = (task) => {
  //create task
  // createdBy, status, userId, type, description
  return HttpService.postWithAuth(`${ApiUrl}/task`, task);
};

export const updateTask = (task) => {
  //update task
  // status, userId, type, description
  return HttpService.putWithAuth(`${ApiUrl}/task`, task);
};

export const getOneTask = (task_id) => {
  //find task by id
  return HttpService.getWithAuth(`${ApiUrl}/task/${task_id}`);
};

export const deleteTask = (task_id) => {
  //working
  return HttpService.postWithAuth(`${ApiUrl}/archive-task/${task_id}`);
};

export const getTasksPaginated = (query) => {
  //query = context.query, contains search params on tasks page
  //working
  return HttpService.getWithAuth(
    `${ApiUrl}/tasks-paginated?page=${query.page}&userId=${query.userId}&status=${query.status}&type=${query.type}`,
  );
};
