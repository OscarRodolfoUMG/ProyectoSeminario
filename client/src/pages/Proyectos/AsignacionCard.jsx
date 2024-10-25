import { Link, useNavigate } from 'react-router-dom';
import { useProyects } from '../../context/ProyectContext.jsx'

function ProyectCard({ proyect }) {

    const { deleteProyect } = useProyects();
    const navigate = useNavigate();

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

                    <Link to={`/asignaciones/${proyect.id_proyecto}`}
                    className='bg-green-700 hover:bg-green-500 text-white px-4 py-2 rounded-md'
                    >Asignar</Link>
                    
                </div>
            </header>
            
        </div>
    )
}

export default ProyectCard;