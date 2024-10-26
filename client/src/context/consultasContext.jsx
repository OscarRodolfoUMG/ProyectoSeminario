import { createContext, useContext, useState } from "react";
import { 
    cantidadDesarrolladores, 
    cantidadAnalistas, 
    cantidadProyectos, 
    cantidadPruebas, 
    cantidadTareasCompletadas, 
    cantidadTareasNoCompletadas, 
    cantidadTareasPendientes, 
    cantidadTareasPorProyecto, 
    cantidadTareasCompletadasPorProyecto,
    erroresPorProyecto
} from "../api/consultas";

//Contexto para los informes
const ConsultasContext = createContext();
export const useConsultas = () => {
    const context = useContext(ConsultasContext);
    if (!context) {
        throw new Error('useConsultas debe usarse dentro de un ConsultasProvider');
    }
    return context;
}

export function ConsultasProvider({ children }) {

    const [consultas, setConsultas] = useState([]);

    const obtenerCantidadDesarrolladores = async () => {
        try {
            const res = await cantidadDesarrolladores();
            return res.data;
        } catch (error) {
            console.log("Error al obtener desarrolladores:", error);
        }
    };

    const obtenerCantidadAnalistas = async () => {
        try {
            const res = await cantidadAnalistas();
            return res.data;
        } catch (error) {
            console.log("Error al obtener analistas:", error);
        }
    };

    const obtenerCantidadProyectos = async () => {
        try {
            const res = await cantidadProyectos();
            return res.data;
        } catch (error) {
            console.log("Error al obtener proyectos:", error);
        }
    };

    const obtenerCantidadPruebas = async () => {
        try {
            const res = await cantidadPruebas();
            return res.data;
        } catch (error) {
            console.log("Error al obtener pruebas:", error);
        }
    };

    const obtenerTareasCompletadas = async () => {
        try {
            const res = await cantidadTareasCompletadas();
            return res.data;
        } catch (error) {
            console.log("Error al obtener tareas completadas:", error);
        }
    };

    const obtenerTareasNoCompletadas = async () => {
        try {
            const res = await cantidadTareasNoCompletadas();
            return res.data;
        } catch (error) {
            console.log("Error al obtener tareas no completadas:", error);
        }
    };

    const obtenerTareasPendientes = async () => {
        try {
            const res = await cantidadTareasPendientes();
            return res.data;
        } catch (error) {
            console.log("Error al obtener tareas pendientes:", error);
        }
    };

    const obtenerTareasPorProyecto = async (id) => {
        try {
            const res = await cantidadTareasPorProyecto(id);
            return res.data;
        } catch (error) {
            console.log("Error al obtener tareas:", error);
        }
    };

    const obtenerTareasCompletadasPorProyecto = async (id) => {
        try {
            const res = await cantidadTareasCompletadasPorProyecto(id);
            return res.data;
        } catch (error) {
            console.log("Error al obtener tareas:", error);
        }
    };

    const obtenerErroresPorProyecto = async () => {
        try {
            const res = await erroresPorProyecto();
            return res.data;
        } catch (error) {
            console.log("Error al obtener tareas pendientes:", error);
        }
    };

    return (
        <ConsultasContext.Provider
            value={{
                consultas,
                obtenerCantidadDesarrolladores,
                obtenerCantidadAnalistas,
                obtenerCantidadProyectos,
                obtenerCantidadPruebas,
                obtenerTareasCompletadas,
                obtenerTareasNoCompletadas,
                obtenerTareasPendientes,
                obtenerTareasPorProyecto,
                obtenerTareasCompletadasPorProyecto,
                obtenerErroresPorProyecto
            }}
        >
            {children}
        </ConsultasContext.Provider>
    );
}
