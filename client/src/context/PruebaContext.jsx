import { createContext, useContext, useState } from "react";
import { createPruebaRequest, getPruebasRequest, deletePruebaRequest, getPruebaRequest, updatePruebaRequest } from "../api/prueba";

//Contexto para los registro de Pruebas
const PruebaContext = createContext();

export const usePruebas = () => {
    const context = useContext(PruebaContext);
    if (!context) {
        throw new Error('usePruebas must be used within a PruebaProvider');
    }
    return context;
}

export function PruebaProvider({ children }) {

    const [pruebas, setPruebas] = useState([]);

    const formatDate = (date) => new Date(date).toISOString().split('T')[0];

    //Solicita todos los registros de pruebas
    const getPruebas = async () => {
        try {
            const res = await getPruebasRequest();
            setPruebas(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    //Solicitud para crear un registro de prueba
    const createPrueba = async (prueba) => {
        try {
            const res = await createPruebaRequest(prueba);  
        } catch (error) {
            console.log(error);
        }
        
    };

    //Solicitud para eliminar un registro de pruebas
    const deletePrueba = async (id) => {
        try {
            const res = await deletePruebaRequest(id);
            if (res.status === 204) setPruebas(pruebas.filter(prueba => prueba.id_prueba !== id));
        } catch (error) {
            console.log(error);
        }
    };

    //Solicitud para obtener la informaciond un registro de pruebas
    const getPrueba = async (id) => {
        try {
            const res = await getPruebaRequest(id);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }

    //Soliciutd para actualizar un registro de pruebas
    const updatePrueba = async (id, prueba) => {
        try {
            await updatePruebaRequest(id, prueba);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <PruebaContext.Provider
            value={{
                pruebas,
                createPrueba,
                deletePrueba,
                getPruebas,
                getPrueba,
                updatePrueba
            }}>
            {children}
        </PruebaContext.Provider>
    );
}
