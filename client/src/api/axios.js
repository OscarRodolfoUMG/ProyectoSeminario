import axios from 'axios';
//Configuracion de la variable de entorno
const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
})

export default instance;