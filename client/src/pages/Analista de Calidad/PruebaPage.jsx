import { useEffect } from "react";
import { usePruebas } from "../../context/PruebaContext"
import PruebaCard from "./PruebaCard";

//Componente para listar las tarjetas de Pruebas
function PruebasPage() {
    const { getPruebas, pruebas } = usePruebas();
    useEffect(() => {
        getPruebas();
    }, []);

    return (
        <div  className="ml-40"> 
            <h1 className="text-2xl">Pruebas</h1>
            {pruebas.length === 0 &&(
                <h1 className="text-2xl mt-20">No Pruebas</h1>
            )}
            <div className="flex flex-col gap-2 mt-10"> 
                {
                    pruebas.map((prueba) => (
                        <PruebaCard key={prueba.id_prueba} prueba={prueba} />
                    ))
                }
            </div>
        </div>
    )
}
export default PruebasPage