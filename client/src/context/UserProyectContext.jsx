import { createContext, useContext, useState } from "react";
import { createUser_ProyectRequest, getUser_ProyectsRequest, deleteUser_ProyectRequest, getUser_ProyectRequest, getUser_ProyectsByProjectRequest } from "../api/user_proyects";

//Contexto para los registros de Usuario Proyecto, es decir, las asignaciones
const User_ProyectContext = createContext();

export const useUser_Proyects = () => {
    const context = useContext(User_ProyectContext);
    if (!context) {
        throw new Error('useUser_Proyects must be used within a User_ProyectProvider');
    }
    return context;
}

export function User_ProyectProvider({ children }) {

    const [user_proyects, setUser_Proyects] = useState([]);

    //Solicitud para obtener todos los registos de usuario-proyecto
    const getUser_Proyects = async () => {
        try {
            const res = await getUser_ProyectsRequest();
            setUser_Proyects(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    //Solicitud para crear una asignacion de usuario-proyecto
    const createUser_Proyect = async (id_user, id_proyect) => {
        try {
            const res = await createUser_ProyectRequest(id_user, id_proyect);
            
            if (res.status === 200) {
                const newUserProyect = { fk_id_usuario: id_user, fk_id_proyecto: id_proyect };
                setUser_Proyects(prev => [...prev, newUserProyect]);
            }
        } catch (error) {
            console.log(error);
        }
    };
    
    //Solicitud para eliminar una asignacion de usuario-proyecto
    const deleteUser_Proyect = async (id_user, id_proyect) => {
        try {
            const res = await deleteUser_ProyectRequest(id_user, id_proyect)
            if (res.status === 204) setUser_Proyects(user_proyects.filter(user_proyect => user_proyect.fk_id_usuario !== id_user, id_proyect))
        } catch (error) {
            console.log(error);
        }
    };

    //Solicitud para obtner la informacion de un usuario-proyecto
    const getUser_Proyect = async(id_user, id_proyect) => {
        try {
            const res = await getUser_ProyectRequest(id_user, id_proyect);
            return res.data;
        } catch (error) {
            console.log(error)
        }
    };

    //Solicitud de la informacion de usuario-proyecto por un proyecto
    const getUser_ProyectsByProject = async (id_proyecto) => {
        try {
            const res = await getUser_ProyectsByProjectRequest(id_proyecto)
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };
    
    return (
        <User_ProyectContext.Provider
            value={{
                user_proyects,
                createUser_Proyect,
                deleteUser_Proyect,
                getUser_Proyects,
                getUser_Proyect,
                getUser_ProyectsByProject,
            }}>
            {children}
        </User_ProyectContext.Provider>
    )
}