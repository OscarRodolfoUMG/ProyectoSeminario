import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useProyects } from "../../context/ProyectContext";
import ProyectCard from "./ProyectCard";

//Componente para listar los registros de Falla
function ProyectsPage() {
    const { getProyects, proyects } = useProyects();

    useEffect(() => {
        getProyects();
    }, []);

    return (
        <div className="ml-40">
            <Link
                className="bg-green-700 hover:bg-green-500 text-white py-2 px-4 rounded-md"
                to='/add-proyect'
            >
                Nuevo Proyecto
            </Link>

            {proyects.length === 0 &&(
                <h1 className="text-2xl mt-20">No Registros de Errores</h1>
            )}

            <div className="grid grid-cols-1 gap-2 mt-10">
                <>
                    {
                        proyects.map((proyect) => (

                            <ProyectCard key={proyect.id_proyecto} proyect={proyect} />
                        ))
                    }
                </>
            </div>
        </div>
    )
}
export default ProyectsPage