import { createContext, useContext, useState } from "react";
import { getUsersRequest, getUserTypeRequest, deleteUserRequest, getUserRequest, updateUserRequest } from "../api/users";
import { registerRequest } from '../api/auth';

//Contexto para los registros de Usuarios
const UserContext = createContext();

export const useUsers = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUsers must be used within a UserProvider');
    }
    return context;
}

export function UserProvider({ children }) {

    const [users, setUsers] = useState([]);

    //Obtiene los datos de los usuarios
    const getUsers = async () => {
        try {
            const res = await getUsersRequest();
            setUsers(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    //Solicitud para crear un usuario
    const createUser = async (user) => {
        try {
            const res = await registerRequest(user);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }

    };

    //Solicitud para eliminar el registro de un usuario
    const deleteUser = async (id) => {
        try {
            const res = await deleteUserRequest(id)
            if (res.status === 204) setUsers(users.filter(user => user.id_usuario !== id))
        } catch (error) {
            console.log(error);
        }
    };

    //Solicitud para obtenes informacion de un usuario
    const getUser = async (id) => {
        try {
            const res = await getUserRequest(id);
            return res.data;
        } catch (error) {
            console.log(error)
        }
    }

    //Solicitud para actualizar el registro de un usuario
    const updateUser = async (id, user) => {
        try {
            await updateUserRequest(id, user)
        } catch (error) {
            console.log(error)
        }
    }

    //Solicitud para obtener el tipo de un usuario
    const getUsersByType = async (type) => {
        try {
            const res = getUserTypeRequest(type);
            return res.data;
        } catch (error) {
            console.log(error)
        }

    };

    return (
        <UserContext.Provider
            value={{
                users,
                createUser,
                deleteUser,
                getUsers,
                getUser,
                updateUser,
                getUsersByType
            }}>
            {children}
        </UserContext.Provider>
    )
}