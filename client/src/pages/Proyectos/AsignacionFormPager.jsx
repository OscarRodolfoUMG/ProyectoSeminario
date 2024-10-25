import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';

import { useProyects } from "../../context/ProyectContext";
import { useUser_Proyects } from "../../context/UserProyectContext";
import { useUsers } from "../../context/UserContext";

import AsignacionItem from "./AsignacionItem";

function AsignacionFormPage() {
    const { getProyects } = useProyects();
    const { getUsers, users, getUsersByType } = useUsers();
    const { user_proyects, createUser_Proyect, getUser_Proyects, getUser_Proyect, getUser_ProyectsByProject } = useUser_Proyects();

    const navigate = useNavigate();
    const params = useParams();

    const [availableUsers, setAvailableUsers] = useState([]);

    useEffect(() => {
        getUser_ProyectsByProject(params.id); 
        getProyects();
        getUsers();
    }, [params.id]);

    useEffect(() => {
        const assignedUserIds = user_proyects
            .filter(up => up.fk_id_proyecto === parseInt(params.id)) 
            .map(up => up.fk_id_usuario);

        const filteredUsers = users.filter(user =>
            !assignedUserIds.includes(user.id_usuario) && user.fk_tipo_usuario !== 1 && user.fk_tipo_usuario !== 2
        );

        setAvailableUsers(filteredUsers);
    }, [user_proyects, users, params.id]);


    const handleAssignUser = async (userId) => {
        await createUser_Proyect(userId, params.id);
        await getUser_Proyects();
        navigate(`/asignaciones/${params.id}`);
    };

    return (
        <div className="ml-40">
            <h2 className="text-2xl">Usuarios Asignados</h2>

            {user_proyects.length === 0 && (
                <h1 className="text-2xl mt-20">No hay usuarios asignados</h1>
            )}

            <div className="grid grid-cols-1 gap-2 mt-10">
                {user_proyects
                    .filter(up => up.fk_id_proyecto === parseInt(params.id))  // Filtra por el proyecto actual
                    .map((user_proyect) => (
                        <AsignacionItem key={user_proyect.fk_id_usuario} user_proyect={user_proyect} />
                    ))
                }

            </div>

            <h2 className="text-2xl mt-10">Usuarios Disponibles para Asignar</h2>

            {availableUsers.length === 0 && (
                <h1 className="text-xl mt-5">No hay usuarios disponibles para asignar</h1>
            )}

            <div className="grid grid-cols-1 gap-2 mt-5">
                {availableUsers.map((user) => (
                    <div key={user.id_usuario} className="bg-zinc-700 w-full p-4 rounded-md">
                        <div className="flex justify-between">
                            <span>{user.nombre}</span>
                            <button
                                className='bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-md'
                                onClick={() => handleAssignUser(user.id_usuario)}>
                                Asignar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AsignacionFormPage;
