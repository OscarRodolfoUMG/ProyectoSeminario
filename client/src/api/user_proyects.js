import axios from "./axios";
//Peticiones al servidor de Backend
export const getUser_ProyectsRequest = () => axios.get('/user_proyects');
export const getUser_ProyectRequest = (id_user, id_proyect) => axios.get(`/user_proyects/${id_user}/${id_proyect}`);
export const createUser_ProyectRequest = (id_user, id_proyect) => axios.post(`/user_proyects/${id_user}/${id_proyect}`);
export const deleteUser_ProyectRequest = (id_user, id_proyect) => axios.delete(`/user_proyects/${id_user}/${id_proyect}`);
export const getUser_ProyectsByProjectRequest = (id_proyecto) => axios.get(`/user_proyects?id_proyecto=${id_proyecto}`);


