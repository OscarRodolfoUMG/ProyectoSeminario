import { useTasks } from '../context/TaskContext.jsx'
import { Link, useNavigate } from 'react-router-dom';

//Tarjeta para mapear las tareas
function TaskCard({ task }) {

    const { deleteTask } = useTasks();
    const navigate = useNavigate();
    
    const formatDate = (date) => {
        if (!date) {
            return "No definida";
        }
        return new Date(date).toISOString().split('T')[0];
    };

    const estadoMap = {
        1: 'En Proceso',
        2: 'Completada',
        3: 'Sin Terminar',
    };

    const prioridadMap = {
        1: 'Baja',
        2: 'Mediana',
        3: 'Urgente',
    };

    const handleDelete = async (id_tarea) => {
        const confirmed = window.confirm("¿Seguro deseas eliminar esta Tarea?");
        if (confirmed) {
            await deleteTask(id_tarea);
            navigate('/tasks');
        }
    };

    return (
        <div className="bg-zinc-800 p-5 rounded-md flex justify-between items-center text-sm">
            <div>
                <h1 className="text-lg font-semibold">{task.nombre}</h1>
                <p className="text-slate-400">Estado: {estadoMap[task.fk_id_estado]}</p>
                <p className="text-slate-400">Prioridad: {prioridadMap[task.fk_id_estado]}</p>
                <p className="text-slate-400">Entrega: {formatDate(task.fecha_final)}</p>
            </div>
            <div className="flex gap-x-2 items-center">
                <button
                    className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md'
                    onClick={() => {
                        handleDelete(task.id_tarea);
                    }}>Eliminar
                </button>
                <Link to={`/edit-tasks/${task.id_tarea}`}
                    className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md'
                >Editar
                </Link>
            </div>

        </div>
    )
}

export default TaskCard;