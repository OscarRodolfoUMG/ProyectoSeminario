import { useUsers } from '../context/UserContext.jsx'
import { Link, useNavigate } from 'react-router-dom';

//Tarjeta para mapear los usuarios
function UserCard({ user }) {

    const { deleteUser } = useUsers();
    const navigate = useNavigate();

    const handleDelete = async (id_usuario) => {
        const confirmed = window.confirm("¿Seguro deseas eliminar este Usuario?");
        if (confirmed) {
            await deleteUser(id_usuario);
            navigate('/users');
        }
    };      

    return (
        <div className="bg-zinc-800 w-full p-10 rounded-md">
            <header className="flex justify-between">
                <h1 className="text-2xl font-bold">{user.nombre}</h1>
                <div className="flex gap-x-2 items-center">
                    <button 
                    className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md'
                    onClick={() => {
                        handleDelete(user.id_usuario);
                    }}>Delete</button>

                    <Link to={`/users/${user.id_usuario}`}
                    className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md'
                    >Edit</Link>
                    
                </div>
            </header>
            <p className="text-slate-300">{user.email}</p>
        </div>
    )
}

export default UserCard;