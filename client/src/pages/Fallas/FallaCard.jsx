import { Link, useNavigate } from 'react-router-dom';
import { useFallas } from '../../context/FallaContext.jsx'

//Componente de tarjeta para listar los Errores
function FallaCard({ falla }) {
    const { deleteFalla } = useFallas();
    const navigate = useNavigate();

    const handleDelete = async (id_fallao) => {
        const confirmed = window.confirm("¿Estás seguro que desea Eliminar?");
        if (confirmed) {
            await deleteFalla(id_fallao);
            navigate('/fallas');
        }
    };

    return (
        <div className="bg-zinc-800 w-full p-10 rounded-md">
            <header className="flex justify-between">
                <h1 className="text-2xl font-bold">{falla.descripcion}</h1>
                <div className="flex gap-x-2 items-center">
                    <button
                        className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md'
                        onClick={() => {
                            handleDelete(falla.id_falla);
                        }}>Eliminar</button>
                </div>
            </header>
        </div>
    )
}

export default FallaCard;