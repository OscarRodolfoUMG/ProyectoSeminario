import { createContext, useContext, useState } from "react";
import { createFallaRequest, getFallasRequest, deleteFallaRequest, getFallaRequest, updateFallaRequest } from "../api/falla.js";

//Contexto para los errores
const FallaContext = createContext();

export const useFallas = () => {
    const context = useContext(FallaContext);
    if (!context) {
        throw new Error('useFallas must be used within a FallaProvider');
    }
    return context;
}

export function FallaProvider({ children }) {

    const [fallas, setFallas] = useState([]);

    //Envia peticion que trae los elementos de fallas
    const getFallas = async () => {
        try {
            const res = await getFallasRequest();
            setFallas(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    //Envia peticion para ingresar un elemento en fallas
    const createFalla = async (falla) => {
        try {
            const res = await createFallaRequest(falla); 
        } catch (error) {
            console.log(error);
        }
    };

    //Envia peticion para eliminar determinado registro de falla
    const deleteFalla = async (id) => {
        try {
            const res = await deleteFallaRequest(id);
            if (res.status === 204) setFallas(fallas.filter(falla => falla.id_falla !== id));
        } catch (error) {
            console.log(error);
        }
    };

    //Envia peticion para obtener los registros de una falla
    const getFalla = async (id) => {
        try {
            const res = await getFallaRequest(id);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }

    //Envia peticion para actualizar un registro de falla
    const updateFalla = async (id, falla) => {
        try {
            await updateFallaRequest(id, falla);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <FallaContext.Provider
            value={{
                fallas,
                createFalla,
                deleteFalla,
                getFallas,
                getFalla,
                updateFalla
            }}>
            {children}
        </FallaContext.Provider>
    );
}
