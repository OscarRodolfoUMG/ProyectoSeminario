import { createContext, useContext, useState } from "react";
import { createPlanPruebaRequest, getPlanPruebasRequest, deletePlanPruebaRequest, getPlanPruebaRequest, updatePlanPruebaRequest } from "../api/planPrueba";

//Contexto para los registros de Planes de Prueba
const PlanPruebaContext = createContext();
export const usePlanPruebas = () => {
    const context = useContext(PlanPruebaContext);
    if (!context) {
        throw new Error('usePlanPruebas must be used within a PlanPruebaProvider');
    }
    return context;
}

export function PlanPruebaProvider({ children }) {

    const [planPruebas, setPlanPruebas] = useState([]);

    const formatDate = (date) => new Date(date).toISOString().split('T')[0];

    //Obtener todos los registros de planes pruebas
    const getPlanPruebas = async () => {
        try {
            const res = await getPlanPruebasRequest();
            setPlanPruebas(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    //Enviar solicitud para crear un plan de pruebas
    const createPlanPrueba = async (id) => {
        try {
            const res = await createPlanPruebaRequest(id);  
        } catch (error) {
            console.log(error);
        }
        
    };

    //Envia peticion para eliminar un plan de pruebas 
    const deletePlanPrueba = async (id) => {
        try {
            const res = await deletePlanPruebaRequest(id);
            if (res.status === 204) setPlanPruebas(planPruebas.filter(planPrueba => planPrueba.id_plan_prueba !== id));
        } catch (error) {
            console.log(error);
        }
    };

    //Envia peticion para obtener un plan de pruebas
    const getPlanPrueba = async (id) => {
        try {
            const res = await getPlanPruebaRequest(id);
            const planPrueba = res.data;
            
            // Formatear las fechas antes de devolver el plan de prueba
            planPrueba.fecha = formatDate(planPrueba.fecha);

            return planPrueba;
        } catch (error) {
            console.log(error);
        }
    };

    //Envia petcion para actalizar un plan de pruebas
    const updatePlanPrueba = async (id, planPrueba) => {
        try {
            await updatePlanPruebaRequest(id, planPrueba);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <PlanPruebaContext.Provider
            value={{
                planPruebas,
                createPlanPrueba,
                deletePlanPrueba,
                getPlanPruebas,
                getPlanPrueba,
                updatePlanPrueba
            }}>
            {children}
        </PlanPruebaContext.Provider>
    );
}
