

import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useTasks } from '../context/TaskContext';
import { useProyects } from "../context/ProyectContext";
import { useUsers } from "../context/UserContext";

function TaskFormPage() {
    const { register, handleSubmit, setValue } = useForm();

    const [proyectName, setProyectName] = useState("");
    const [desarrollador, setDesarrollador] = useState("");
    const [analista, setAnalista] = useState("");

    const { createTask, getTask, updateTask, tasks } = useTasks();
    const { getProyects, proyects } = useProyects();
    const { getUsers, users, getUsersByType } = useUsers();

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        async function fetchData() {
            await getTask(params.id);
            await getUsers();
        }
        fetchData();
    }, [params.id]);

    useEffect(() => {
        async function loadTask() {
            setValue('nombre', tasks[0].nombre);
            setValue('descripcion', tasks[0].descripcion);
            setValue('fecha_inicio', tasks[0].fecha_inicio);
            setValue('fecha_final', tasks[0].fecha_final);
            setValue('fecha_completado', tasks[0].fecha_completado);
            setValue('fk_id_tipo_tarea', tasks[0].fk_id_tipo_tarea);
            setValue('fk_id_estado', tasks[0].fk_id_estado);
            setValue('fk_id_prioridad', tasks[0].fk_id_prioridad);
            const user1 = users.find(u => u.id_usuario === tasks[0].fk_id_responsable);
            if (user1) {
                setDesarrollador(user1.nombre);
            }
            const user2 = users.find(u => u.id_usuario === tasks[0].fk_id_supervisor);
            if (user2) {
                setAnalista(user2.nombre);
            }
        }
        loadTask();
    }, [tasks, users]);

    const onSumbit = handleSubmit(async (values) => {
        if (params.id) {
            updateTask(params.id, values);
        }
        navigate('/tasks');
    });


    return (

        <div className='bg-zinc-800 max-w-md w-full ml-40 p-10 rounded-md'>
            <h1 className='text-2xl font-bold mb-5 text-center'>Proyecto: {proyectName}</h1>
            <form onSubmit={onSumbit}>
                {/* id_proyecto */}
                <input value={tasks[0].fk_id_proyecto}
                    type="hidden"
                    {...register('fk_id_proyecto')} 
                />
                {/* id_proyecto */}
                <input value={tasks[0].fk_id_responsable}
                    type="hidden"
                    {...register('fk_id_responsable')} 
                />
                {/* id_proyecto */}
                <input value={tasks[0].fk_id_supervisor}
                    type="hidden"
                    {...register('fk_id_supervisor')} 
                />
                {/* NOMBRE */}
                <label htmlFor="nombre">Nombre</label>
                <input
                    type="text"
                    placeholder="Nombre"
                    {...register("nombre")}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    autoComplete='off'
                    required
                />
                {/* DESCRIPCION */}
                <label htmlFor="descripcion">Descripción</label>
                <textarea
                    rows="3"
                    placeholder="Descripción"
                    {...register("descripcion")}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    required
                ></textarea>
                {/* FECHA_INICIO */}
                <label htmlFor="fecha_inicio">Fecha Inicio</label>
                <input
                    type="date"
                    {...register("fecha_inicio")}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                />
                {/* FECHA_FINAL */}
                <label htmlFor="fecha_final">Fecha Entrega</label>
                <input
                    type="date"
                    {...register("fecha_final")}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                />
                {/* FECHA_COMPLETADO */}
                <label htmlFor="fecha_completado">Fecha Completado</label>
                <input
                    type="date"
                    {...register("fecha_completado")}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                />
                {/* TIPO_TAREA */}
                <label htmlFor="fk_id_tipo_tarea">Tipo de Tarea</label>
                <select {...register('fk_id_tipo_tarea')} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'>
                    <option value="1">Nueva Tarea</option>
                    <option value="2">Corrección Tarea</option>
                </select>
                {/* ESTADO */}
                <label htmlFor="fk_id_estado">Estado</label>
                <select {...register('fk_id_estado')} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'>
                    <option value="1">En Proceso</option>
                    <option value="2">Completada</option>
                    <option value="3">Sin Terminar</option>
                </select>
                {/* PRIORIDAD */}
                <label htmlFor="fk_id_prioridad">Prioridad</label>
                <select {...register('fk_id_prioridad')} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'>
                    <option value="1">Baja</option>
                    <option value="2">Mediana</option>
                    <option value="3">Urgente</option>
                </select>

                {/* ENCARGADO (Desarrollador) */}

                <label htmlFor="nombre_responsable">Encargado (Desarrollador)</label>
                <input
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    type="text"
                    autoComplete='off'
                    disabled
                    value={desarrollador}

                />

                {/* RESPONSABLE (Analista de calidad) */}

                <label htmlFor="nombre_supervisor">Supervisor (Analista de Calidad)</label>
                <input
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    type="text"
                    autoComplete='off'
                    disabled
                    value={analista}

                />
                
                <button type="submit"
                    className='bg-zinc-800  border-2 border-green-700  text-white px-8 py-2 mt-5 rounded-md my-2 relative overflow-hidden group transition-all duration-300'>
                    <span className="relative z-10 font-bold">Guardar</span>
                    <div className="absolute inset-0 bg-green-700 w-0 h-full group-hover:w-full transition-all duration-500 ease-out"></div>
                </button>
            </form>
        </div>
    )
}
export default TaskFormPage;