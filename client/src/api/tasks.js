import axios from "./axios";
//Peticiones al servidor de Backend
export const getTasksRequest = () => axios.get('/tasks', { headers: { 'Cache-Control': 'no-cache' } });
export const getTaskRequest = (id) => axios.get(`/tasks/${id}`);
export const createTaskRequest = (task) => axios.post('/tasks', task);
export const updateTaskRequest = (id, task) => axios.put(`/tasks/${id}`, task);
export const deleteTaskRequest = (id) => axios.delete(`/tasks/${id}`);
