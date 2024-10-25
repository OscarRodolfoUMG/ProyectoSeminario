import { Link, useNavigate } from 'react-router-dom';
import { useProyects } from '../../context/ProyectContext.jsx'

//Componente tarjeta para listar las tareas por prueba
function ProyectCard({ task, planPrueba }) {

    return (
        <div className="bg-zinc-800 w-full p-10 rounded-md">
            <header className="flex justify-between">
                <h1 className="text-2xl font-bold">{task.nombre}</h1>
                <div className="flex gap-x-2 items-center">
                    <Link to={`/create-prueba/${task.id_tarea}/${planPrueba.id_plan_prueba}`}
                        className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md'
                    >Crear Prueba</Link>
                </div>
            </header>

        </div>
    )
}

export default ProyectCard;