import { createContext, useContext, useState } from "react";
import { createTaskRequest, getTasksRequest, deleteTaskRequest, getTaskRequest, updateTaskRequest } from "../api/tasks";

//Contexto para los registros de Tareas
const TaskContext = createContext();

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTaks must be used within a TaskProvider');
    }
    return context;
}

export function TaskProvider({ children }) {

    const [tasks, setTasks] = useState([]);

    const formatDate = (date) => new Date(date).toISOString().split('T')[0];

    //Solicitud para obtener todos los registros de tareas
    const getTasks = async () => {
        try {
            const res = await getTasksRequest();
            setTasks(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    //Solicitud para crear un registro de tarea
    const createTask = async (task) => {
        try {
            const res = await createTaskRequest(task);
        } catch (error) {
            console.log(error);
        }
    };
    
    //Solicitud para eliminar un registro de tareas
    const deleteTask = async (id) => {
        try {
            const res = await deleteTaskRequest(id)
            if (res.status === 204) setTasks(tasks.filter(task => task.id_tarea !== id))
        } catch (error) {
            console.log(error);
        }
    };

    //Solicitud para obtener un registro de tareas
    const getTask = async(id) => {
        try {
            const res = await getTaskRequest(id);
            const task = res.data;

            task.fecha_inicio = formatDate(task.fecha_inicio);
            task.fecha_final = formatDate(task.fecha_final);
            task.fecha_completado = formatDate(task.fecha_completado);

            return task;
        } catch (error) {
            console.log(error)
        }
    }

    //Solicitud para actualizar un registro de tareas
    const updateTask = async(id, task) => {
        try {
            await updateTaskRequest(id, task)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <TaskContext.Provider
            value={{
                tasks,
                createTask,
                deleteTask,
                getTasks,
                getTask,
                updateTask
            }}>
            {children}
        </TaskContext.Provider>
    )
}