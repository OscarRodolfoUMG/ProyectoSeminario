import { Link, useNavigate, useParams } from 'react-router-dom';
import { useUser_Proyects } from '../../context/UserProyectContext.jsx';
import { useUsers } from '../../context/UserContext.jsx';
import { useState , useEffect} from 'react';

function AsignacionItem({ user_proyect }) {

    const { deleteUser_Proyect, getUser_Proyect } = useUser_Proyects();
    const { users } = useUsers();
    const navigate = useNavigate();
    const params = useParams();

    const [userName, setUserName] = useState("");

    useEffect(() => {
        const user = users.find(u => u.id_usuario === user_proyect.fk_id_usuario);
        if (user) {
            setUserName(user.nombre);
        }
    }, [user_proyect.fk_id_usuario, users]);


    const handleDelete = async (id_usuario, id_proyecto)  => {
        const confirmed = window.confirm("¿Eliminar Asignacion?");
        if (confirmed) {
            await deleteUser_Proyect(id_usuario, params.id);
            navigate(`/asignaciones/${params.id}`);
        }
    };

    return (
        <div className="bg-zinc-800 w-full p-10 rounded-md">
            <header className="flex justify-between">
                <h1 className="text-2xl font-bold">{userName}</h1>
                <div className="flex gap-x-2 items-center">
                    <button 
                    className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md'
                    onClick={() => {
                        handleDelete(user_proyect.fk_id_usuario);
                    }}>Remover</button>

                    
                </div>
            </header>
        </div>
    )
}

export default AsignacionItem;