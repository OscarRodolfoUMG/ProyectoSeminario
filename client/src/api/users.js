import axios from "./axios";
//Peticiones al servidor de Backend
export const getUsersRequest = () => axios.get('/users');
export const getUserRequest = (id) => axios.get(`/users/${id}`);
export const createUserRequest = (user) => axios.post('/users', user);
export const updateUserRequest = (id, user) => axios.put(`/users/${id}`, user);
export const deleteUserRequest = (id) => axios.delete(`/users/${id}`);

export const getUserTypeRequest = (type) => axios.get(`/usersType/${type}`);
