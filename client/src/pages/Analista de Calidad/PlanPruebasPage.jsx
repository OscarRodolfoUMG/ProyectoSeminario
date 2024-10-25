import { useEffect } from "react";
import { Link } from "react-router-dom";

import { usePlanPruebas } from "../../context/PlanPruebaContext";
import PlanPruebaCard from "./PlanPruebasCard";

//Componente para listar los planes de pruebas
function PlanPruebasPage() {
    const { getPlanPruebas, planPruebas } = usePlanPruebas();

    useEffect(() => {
        getPlanPruebas();
    }, []);

    return (
        <div className="ml-40">
            <Link
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
                to='/add-planPrueba'
            >
                Nuevo Plan Prueba
            </Link>

            {planPruebas.length === 0 &&(
                <h1 className="text-2xl mt-20">No Plan Pruebas</h1>
            )}

            <div className="grid grid-cols-1 gap-2 mt-10">
                <>
                    {
                        planPruebas.map((planPrueba) => (

                            <PlanPruebaCard key={planPrueba.id_plan_prueba} planPrueba={planPrueba} />
                        ))
                    }
                </>
            </div>
        </div>
    )
}
export default PlanPruebasPage