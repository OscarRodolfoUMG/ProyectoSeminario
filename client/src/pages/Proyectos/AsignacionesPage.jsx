import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useProyects } from "../../context/ProyectContext"
import { useUsers } from "../../context/UserContext";;
import AsignacionCard from "./AsignacionCard"


function ProyectsPage() {
    const { getProyects, proyects } = useProyects();

    useEffect(() => {
        getProyects();
    }, []);

    return (
        <div className="ml-40">

            <h1 className="text-3xl ">Asignaciones</h1>

            {proyects.length === 0 && (
                <h1 className="text-2xl mt-20">No Asignaciones</h1>
            )}

            <div className="grid grid-cols-1 gap-2 mt-10">
                <>
                    {
                        proyects.map((proyect) => (

                            <AsignacionCard key={proyect.id_proyecto} proyect={proyect} />
                        ))
                    }
                </>
            </div>
        </div>
    )
}
export default ProyectsPage