import { useEffect } from "react";

import { useFallas } from "../../context/FallaContext";
import FallaCard from "./FallaCard";

//Componente para listar las tarjetas de errores
function FallaPage() {
    const { getFallas, fallas } = useFallas();

    useEffect(() => {
        getFallas();
    }, []);

    return (
        <div className="ml-40">
            <h1 className="text-2xl">Errores y Defectos</h1>
            {fallas.length === 0 &&(
                <h1 className="text-xl mt-20">No Resultados</h1>
            )}

            <div className="grid grid-cols-1 gap-2 mt-10">
                <>
                    {
                        fallas.map((falla) => (

                            <FallaCard key={falla.id_falla} falla={falla} />
                        ))
                    }
                </>
            </div>
        </div>
    )
}
export default FallaPage