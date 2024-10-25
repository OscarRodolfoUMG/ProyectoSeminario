import { Link, useNavigate } from 'react-router-dom';
import { useState , useEffect} from 'react';

import { usePlanPruebas } from '../../context/PlanPruebaContext.jsx';
import { useProyects } from '../../context/ProyectContext.jsx';

//Componente de tarjeta para los planes de prueba
function PlanPruebaCard({ planPrueba }) {

    const { deletePlanPrueba } = usePlanPruebas();
    const { getProyects, proyects } = useProyects();
    const navigate = useNavigate();

    const [proyectName, setProyectName] = useState("");

    const formatDate = (date) => {
        if (!date) {
            return "No definida";  
        }
        return new Date(date).toISOString().split('T')[0];
    };
    //Carga la informacion de los proyectos
    useEffect(() => {
        getProyects();
    }, []);

    //Se encarga de encontrar el nombre de un proyecto
    useEffect(() => {
        const proyect = proyects.find(p => p.id_proyecto === planPrueba.fk_id_proyecto);
        if (proyect) {
            setProyectName(proyect.nombre);
        }
    }, [planPrueba.fk_id_proyecto, proyects]); 

    const handleDelete = async (id_planPrueba) => {
        const confirmed = window.confirm("¿Estás seguro que deseas eliminar este Usuario?");
        if (confirmed) {
            await deletePlanPrueba(id_planPrueba);
            navigate('/planPrueba');
        }
    };

    return (
        <div className="bg-zinc-800 w-full p-10 rounded-md">
            <header className="flex justify-between">
                <h1 className="text-2xl font-bold">Proyecto: {proyectName}</h1>
                <div className="flex gap-x-2 items-center">
                    <button 
                    className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md'
                    onClick={() => {
                        handleDelete(planPrueba.id_plan_prueba);
                    }}>Eliminar</button>    

                    <Link to={`/edit-planPrueba/${planPrueba.id_plan_prueba}`}
                    className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md'
                    >Revisar</Link>
                    
                </div>
            </header>
            <p className="text-slate-300">Fecha Entrega: {formatDate(planPrueba.fecha_final)}</p>
        </div>
    )
}

export default PlanPruebaCard;