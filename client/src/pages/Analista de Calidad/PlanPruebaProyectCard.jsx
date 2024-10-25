import { Link, useNavigate } from 'react-router-dom';
import { useProyects } from '../../context/ProyectContext.jsx'
import { usePlanPruebas } from '../../context/PlanPruebaContext.jsx';

//Componete de tarjeta para listar los proyectos en planes de prueba
function ProyectCard({ proyect }) {

    const { deleteProyect } = useProyects();
    const { createPlanPrueba, getPlanPrueba, updatePlanPrueba } = usePlanPruebas();
    const navigate = useNavigate();

    //Se utilizar para formatear algunas fechas
    const formatDate = (date) => {
        if (!date) {
            return "No definida"; 
        }
        return new Date(date).toISOString().split('T')[0];
    };

    const handleCrear = async (id_proyecto) => {
        const confirmed = window.confirm("¿Confirmar creacion de Plan de Pruebas?");
        if (confirmed) {
            await  createPlanPrueba(id_proyecto);
            navigate('/planPrueba');
        }
    };

    return (
        <div className="bg-zinc-800 w-full p-10 rounded-md">
            <header className="flex justify-between">
                <h1 className="text-2xl font-bold">{proyect.nombre}</h1>
                <div className="flex gap-x-2 items-center">
                    <button 
                    className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md'
                    onClick={() => {
                        handleCrear(proyect.id_proyecto);
                    }}>Crear Plan Prueba</button>
                </div>
            </header>
            <p className="text-slate-300">Fecha Entrega: {formatDate(proyect.fecha_final)}</p>
        </div>
    )
}

export default ProyectCard;