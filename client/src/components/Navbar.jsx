import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

//Componente de Navegacion para la pagina de inicio y navegacion de usuarios
function Navbar() {

    const { logout, user, isAuthenticated } = useAuth();
    const location = useLocation();

    return (
        <> 
            {isAuthenticated ? ( //Nav cuando  ha ingresado al sistema
                <nav className="fixed bg-zinc-700 w-36 h-screen px-0 py-5 flex flex-col justify-between">
                    <ul className="flex flex-col gap-y-4">
                        <li className="self-center text-3xl font-bold py-5">
                            SGPCC
                        </li>
                        {/* Acciones del usuario Administrador */}
                        {user.fk_tipo_usuario === 1 && (
                            <>
                                <div className="mt-auto w-full">
                                    <li className="self-center flex-1 mr-2 w-full">
                                        <Link className="text-white py-4 hover:bg-black w-full h-full block text-center" to='/users'>
                                            Usuarios
                                        </Link>
                                    </li>
                                </div>
                                <div className="mt-auto w-full">
                                    <li className="self-center flex-1 mr-2 w-full">
                                        <Link className="text-white py-4 hover:bg-black w-full h-full block text-center" to='/informes'>
                                            Informes
                                        </Link>
                                    </li>
                                </div>
                            </>
                        )}
                        {/* Acciones del usuario Gerente de Proyecto */}
                        {user.fk_tipo_usuario === 2 && (
                            <>
                                <div className="mt-auto w-full">
                                    <li className="self-center flex-1 mr-2 w-full">
                                        <Link className="text-white py-4 hover:bg-black w-full h-full block text-center" to='/proyects'>
                                            Proyectos
                                        </Link>
                                    </li>
                                </div>
                                <div className="mt-auto w-full">
                                    <li className="self-center flex-1 mr-2 w-full">
                                        <Link className="text-white py-4 hover:bg-black w-full h-full block text-center" to='/asignaciones'>
                                            Asignaciones
                                        </Link>
                                    </li>
                                </div>
                                <div className="mt-auto w-full">
                                    <li className="self-center flex-1 mr-2 w-full">
                                        <Link className="text-white py-4 hover:bg-black w-full h-full block text-center" to='/tasks'>
                                            Tareas
                                        </Link>
                                    </li>
                                </div>
                                <div className="mt-auto w-full">
                                    <li className="self-center flex-1 mr-2 w-full">
                                        <Link className="text-white py-4 hover:bg-black w-full h-full block text-center" to='/informes'>
                                            Informes
                                        </Link>
                                    </li>
                                </div>
                            </>
                        )}
                        {/* Acciones del usuario Gerente de Proyecto */}
                        {user.fk_tipo_usuario === 3 && (
                            <>
                                <div className="mt-auto w-full">
                                    <li className="self-center flex-1 mr-2 w-full">
                                        <Link className="text-white py-4 hover:bg-black w-full h-full block text-center" to='/planPrueba'>
                                            Plan Pruebas
                                        </Link>
                                    </li>
                                </div>
                                <div className="mt-auto w-full">
                                    <li className="self-center flex-1 mr-2 w-full">
                                        <Link className="text-white py-4 hover:bg-black w-full h-full block text-center" to='/prueba'>
                                            Pruebas
                                        </Link>
                                    </li>
                                </div>
                                <div className="mt-auto w-full">
                                    <li className="self-center flex-1 mr-2 w-full">
                                        <Link className="text-white py-4 hover:bg-black w-full h-full block text-center" to='/falla'>
                                            Defectos
                                        </Link>
                                    </li>
                                </div>
                            </>
                        )}
                        {/* Acciones del usuario Desarrollador*/}
                        {user.fk_tipo_usuario === 4 && (
                            <>
                                <div className="mt-auto w-full">
                                    <li className="self-center flex-1 mr-2 w-full">
                                        <Link className="text-white py-4 hover:bg-black w-full h-full block text-center" to='/tasks'>
                                            Tareas
                                        </Link>
                                    </li>

                                </div>
                            </>
                        )}
                    </ul>
                    <div className="mt-auto w-full">
                        <Link
                            className="bg-red-600 hover:bg-red-300 text-white w-full h-full block py-4 text-center"
                            to='/'
                            onClick={() => { logout() }}
                        >
                            Cerrar
                        </Link>
                    </div>

                </nav>
            ) : ( //Navegador en el sitio de Inicio
                <div className="fixed w-full">
                    <nav className="bg-zinc-700 w-full h-16 px-4 py-2 flex justify-between items-center">
                        <ul className="flex gap-x-4">
                            <li className="text-3xl font-bold text-white">
                                SGPCC
                            </li>
                        </ul>
                        <div>
                            {location.pathname === '/login' && (
                                <Link className="text-white mr-4 py-2 px-10  border-2 border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300" to='/'>
                                    Inicio
                                </Link>

                            )}
                            {location.pathname === '/' && (
                                <Link className="text-white mr-4 py-2 px-10 border-2 bg-blue-500 border-blue-500 rounded-lg hover:bg-zinc-700 transition duration-300" to='/login'>
                                    Iniciar Sesión
                                </Link>
                            )}
                        </div>
                    </nav>
                </div>
            )}
        </>
    )
}

export default Navbar;

