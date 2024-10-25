import axios from "./axios";
//Peticiones al servidor de Backend
export const getPlanPruebasRequest = () => axios.get('/planPrueba');
export const getPlanPruebaRequest = (id) => axios.get(`/planPrueba/${id}`);
export const createPlanPruebaRequest = (id) => axios.post(`/planPrueba/${id}`);
export const updatePlanPruebaRequest = (id, proyect) => axios.put(`/planPrueba/${id}`, proyect);
export const deletePlanPruebaRequest = (id) => axios.delete(`/planPrueba/${id}`);
