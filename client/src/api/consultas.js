import axios from "./axios";
//Peticiones al servidor de Backend
export const cantidadDesarrolladores = () => axios.get('/consulta1');
export const cantidadAnalistas = () => axios.get('/consulta2');
export const cantidadProyectos = () => axios.get('/consulta3');
export const cantidadPruebas = () => axios.get('/consulta4');
export const cantidadTareasCompletadas = () => axios.get('/consulta5');
export const cantidadTareasNoCompletadas = () => axios.get('/consulta6');
export const cantidadTareasPendientes = () => axios.get('/consulta7');
export const cantidadTareasPorProyecto = (id) => axios.get(`/consulta8/${id}`);
export const cantidadTareasCompletadasPorProyecto = (id) => axios.get(`/consulta9/${id}`);
export const erroresPorProyecto = () => axios.get('/consulta10');
