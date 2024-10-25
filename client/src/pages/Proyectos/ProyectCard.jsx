import { Link, useNavigate } from 'react-router-dom';
import { useProyects } from '../../context/ProyectContext.jsx'

function ProyectCard({ proyect }) {

    const { deleteProyect } = useProyects();
    const navigate = useNavigate();
    const formatDate = (date) => {
        if (!date) {
            return "No definida";  // O el texto que prefieras mostrar si la fecha es null
        }
        return new Date(date).toISOString().split('T')[0];
    };

    const handleDelete = async (id_proyecto) => {
        const confirmed = window.confirm("¿Estás seguro que deseas eliminar este Usuario?");
        if (confirmed) {
            await deleteProyect(id_proyecto);
            navigate('/proyects');
        }
    };



    return (
        <div className="bg-zinc-800 w-full p-10 rounded-md">
            <header className="flex justify-between">
                <h1 className="text-2xl font-bold">{proyect.nombre}</h1>
                <div className="flex gap-x-2 items-center">
                    <button
                        className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md'
                        onClick={() => {
                            handleDelete(proyect.id_proyecto);
                        }}>Eliminar</button>

                    <Link to={`/proyects/${proyect.id_proyecto}`}
                        className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md'
                    >Editar</Link>

                    <Link to={`/tasks/${proyect.id_proyecto}`}
                        className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md'
                    >Nueva Tarea</Link>

                </div>
            </header>
            <p className="text-slate-300">Fecha Entrega: {formatDate(proyect.fecha_final)}</p>
        </div>
    )
}

export default ProyectCard;