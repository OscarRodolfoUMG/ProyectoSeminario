import axios from "./axios";
//Peticiones al servidor de Backend
export const getPruebasRequest = () => axios.get('/pruebas');
export const getPruebaRequest = (id) => axios.get(`/pruebas/${id}`);
export const createPruebaRequest = (proyect) => axios.post('/pruebas', proyect);
export const updatePruebaRequest = (id, proyect) => axios.put(`/pruebas/${id}`, proyect);
export const deletePruebaRequest = (id) => axios.delete(`/pruebas/${id}`);
