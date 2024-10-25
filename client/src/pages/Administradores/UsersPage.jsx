import { useEffect } from "react";
import { useUsers } from "../../context/UserContext";
import UserCard from "../../components/UserCard";
import { Link } from "react-router-dom";

//Compoenente para listar los usuarios mediante tarjetas
function UsersPage() {
    const { getUsers, users } = useUsers();

    useEffect(() => {
        getUsers();
    }, []);
    //Mensaje si no existen registros
    if (users.length === 0) return (<h1>No Usuarios</h1>);

    return (
        <div className="ml-40">
            {/* Enlace para nuevo Usuario */}
            <Link
                className="bg-green-700 hover:bg-green-500 text-white py-2 px-4 rounded-md"
                to='/add-user'
            >
                Nuevo Usuario
            </Link>

            {/* Divisor para cargar las tarjetas */}
            <div className="grid grid-cols-1 gap-2 mt-10">
                <>
                    {
                        users.map((user) => (

                            <UserCard key={user.id_usuario} user={user} />
                        ))
                    }
                </>
            </div>
        </div>
    )
}
export default UsersPage