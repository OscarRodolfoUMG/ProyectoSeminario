import axios from "./axios";

export const getTasksRequest = () => axios.get('/api/tasks');
export const getTaskRequest = (id) => axios.get(`/api/tasks/${id}`);
export const createTaskRequest = (task) => axios.post('/api/tasks', task);
export const updateTaskRequest = (id, task) => axios.put(`/api/tasks/${id}`, task);
export const deleteTaskRequest = (id) => axios.delete(`/api/tasks/${id}`);
