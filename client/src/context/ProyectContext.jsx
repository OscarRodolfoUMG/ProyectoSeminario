import { createContext, useContext, useState } from "react";
import { createProyectRequest, getProyectsRequest, deleteProyectRequest, getProyectRequest, updateProyectRequest } from "../api/proyects";

//Contexto para los registros de Proyectos
const ProyectContext = createContext();

export const useProyects = () => {
    const context = useContext(ProyectContext);
    if (!context) {
        throw new Error('useProyects must be used within a ProyectProvider');
    }
    return context;
}

export function ProyectProvider({ children }) {

    const [proyects, setProyects] = useState([]);

    const formatDate = (date) => new Date(date).toISOString().split('T')[0];

    //Solicita todos los registros de Proyectos
    const getProyects = async () => {
        try {
            const res = await getProyectsRequest();
            setProyects(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    //Solicita la creacion de un proyecto
    const createProyect = async (proyect) => {
        try {
            const res = await createProyectRequest(proyect);   
        } catch (error) {
            console.log(error);
        }
        
    };

    //Solicita la eliminacion de un proyecto mediante un identificador
    const deleteProyect = async (id) => {
        try {
            const res = await deleteProyectRequest(id)
            if (res.status === 204) setProyects(proyects.filter(proyect => proyect.id_proyecto !== id))
        } catch (error) {
            console.log(error);
        }
    };

    //Solicitud para obtener el registro de un proyecto mediante un identificador
    const getProyect = async(id) => {
        try {
            const res = await getProyectRequest(id);
            const proyect = res.data;
            
            // Formatear las fechas antes de devolver el proyecto
            proyect.fecha_inicio = formatDate(proyect.fecha_inicio);
            proyect.fecha_final = formatDate(proyect.fecha_final);

            return proyect;
        } catch (error) {
            console.log(error)
        }
    };

    //Solicitud para actualizar los registros de un Proyecto
    const updateProyect = async(id, proyect) => {
        try {
            await updateProyectRequest(id, proyect)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ProyectContext.Provider
            value={{
                proyects,
                createProyect,
                deleteProyect,
                getProyects,
                getProyect,
                updateProyect
            }}>
            {children}
        </ProyectContext.Provider>
    )
}