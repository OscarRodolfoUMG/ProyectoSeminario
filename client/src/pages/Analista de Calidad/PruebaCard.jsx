import { Link, useNavigate } from 'react-router-dom';
import { usePruebas } from '../../context/PruebaContext.jsx'

//Componente tarjeta para listar Pruebas
function PruebaCard({ prueba }) {

    const { deletePrueba } = usePruebas();
    const navigate = useNavigate();
    const formatDate = (date) => {
        if (!date) {
            return "No definida";
        }
        return new Date(date).toISOString().split('T')[0];
    };

    const handleDelete = async (id_prueba) => {
        const confirmed = window.confirm("¿Estás seguro que deseas eliminar este Usuario?");
        if (confirmed) {
            await deletePrueba(id_prueba);
            navigate('/prueba');
        }
    };

    return (
        <div className="bg-zinc-800 w-full p-10 rounded-md">
            <header className="flex justify-between">

                <h1 className="text-2xl font-bold">{prueba.definicion}</h1>

                <div className="flex gap-x-2 items-center">
                    <Link to={`/edit-prueba/${prueba.id_prueba}`}
                        className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md'
                    >Ver</Link>

                    <Link to={`/create-falla/${prueba.id_prueba}`}
                        className='bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md'
                    >Reportar Error</Link>

                    <button
                        className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md'
                        onClick={() => {
                            handleDelete(prueba.id_prueba);
                        }}>Eliminar</button>
                </div>
                
            </header>
        </div>
    )
}

export default PruebaCard;