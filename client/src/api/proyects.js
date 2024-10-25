import axios from "./axios";
//Peticiones al servidor de Backend
export const getProyectsRequest = () => axios.get('/proyects');
export const getProyectRequest = (id) => axios.get(`/proyects/${id}`);
export const createProyectRequest = (proyect) => axios.post('/proyects', proyect);
export const updateProyectRequest = (id, proyect) => axios.put(`/proyects/${id}`, proyect);
export const deleteProyectRequest = (id) => axios.delete(`/proyects/${id}`);
