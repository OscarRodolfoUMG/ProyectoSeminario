
import { useForm } from 'react-hook-form';

import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useTasks } from '../context/TaskContext';
import { useProyects } from "../context/ProyectContext";
import { useUser_Proyects } from "../context/UserProyectContext";
import { useUsers } from "../context/UserContext";

//Componente de Formulario para crear una tarea
function TaskFormPage() {
    const { register, handleSubmit, setValue } = useForm();

    const [proyectName, setProyectName] = useState("");
    const [desarrolladores, setDesarrolladores] = useState([]);
    const [analistas, setAnalistas] = useState([]);

    const { createTask, getTask, updateTask } = useTasks();
    const { getProyects, proyects } = useProyects();
    const { getUsers, users, getUsersByType } = useUsers();
    const { user_proyects, getUser_Proyect, getUser_ProyectsByProject } = useUser_Proyects();

    const navigate = useNavigate();
    const params = useParams();

    //Obteiene los datos de proyectos y usuarios
    useEffect(() => {
        getProyects();
        getUser_ProyectsByProject(params.id)
        getUsers();
    }, []);

    //Filtra el nombre del proyecto
    useEffect(() => {
        const proyect = proyects.find(p => p.id_proyecto == params.id);
        if (proyect) {
            setProyectName(proyect.nombre);
        }
    }, [params.id, proyects]);

    //Asigna los nombres de los desarrolladores y analistas asignados
    useEffect(() => {
        async function loadData() {
            const assignedUsers = user_proyects
                .filter(up => up.fk_id_proyecto === parseInt(params.id))
                .map(up => users.find(user => user.id_usuario === up.fk_id_usuario));
            const devs = assignedUsers.filter(user => user && user.fk_tipo_usuario === 4);
            const qas = assignedUsers.filter(user => user && user.fk_tipo_usuario === 3);

            setDesarrolladores(devs);
            setAnalistas(qas);
        }

        if (user_proyects.length && users.length) {
            loadData();
        }
    }, [user_proyects, users, params.id]);

    const onSumbit = handleSubmit( async (data) => {
        await createTask(data);
        navigate('/tasks');
    });

    return (

        <div className='bg-zinc-800 max-w-md w-full ml-40 p-10 rounded-md'>
            <h1 className='text-2xl font-bold mb-5 text-center'>Proyecto: {proyectName}</h1>
            <form onSubmit={onSumbit}>
            
                {/* id_proyecto */}
                <input value={params.id}
                    type="hidden"
                    {...register('fk_id_proyecto')} 
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
                <label htmlFor="fk_id_responsable">Encargado (Desarrollador)</label>
                <select {...register('fk_id_responsable')} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' required>
                    <option value="" disabled selected>Selecciona un encargado</option>
                    {desarrolladores.map(dev => (
                        <option key={dev.id_usuario} value={dev.id_usuario}>
                            {dev.nombre}
                        </option>
                    ))}
                </select>

                {/* SUPERVISOR (Analista de calidad) */}
                <label htmlFor="fk_id_supervisor">Supervisor (Analista de Calidad)</label>
                <select {...register('fk_id_supervisor')} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' required>
                    <option value="" disabled selected>Selecciona un supervisor</option>
                    {analistas.map(analyst => (
                        <option key={analyst.id_usuario} value={analyst.id_usuario}>
                            {analyst.nombre}
                        </option>
                    ))}
                </select>


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