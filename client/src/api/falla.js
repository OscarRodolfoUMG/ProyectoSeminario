import axios from "./axios";
//Peticiones al servidor de Backend
export const getFallasRequest = () => axios.get('/fallas');
export const getFallaRequest = (id) => axios.get(`/fallas/${id}`);
export const createFallaRequest = (proyect) => axios.post('/fallas', proyect);
export const updateFallaRequest = (id, proyect) => axios.put(`/fallas/${id}`, proyect);
export const deleteFallaRequest = (id) => axios.delete(`/fallas/${id}`);
