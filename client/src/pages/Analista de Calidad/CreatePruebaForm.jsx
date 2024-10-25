import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { usePruebas } from '../../context/PruebaContext';
import { useTasks } from '../../context/TaskContext';
import { useProyects } from '../../context/ProyectContext';

//Componente del formulario para Crear una prueba
function CreatePruebaForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createPrueba } = usePruebas();
    const { getTasks, tasks } = useTasks();
    const { getProyect, proyects } = useProyects();

    const [tipoPruebas, setTipoPruebas] = useState([]);
    const [tarea, setTarea] = useState(null);
    const [proyecto, setProyecto] = useState(null);

    const navigate = useNavigate();
    const params = useParams();

    //Carga las pruebas segun el proyecto
    useEffect(() => {
        async function fetchTareaProyecto() {
            await getTasks();

            const tareaActual = tasks.find(task => task.id_tarea === parseInt(params.id));
            if (tareaActual) {
                setTarea(tareaActual);
                const proyectoActual = await getProyect(tareaActual.fk_id_proyecto);
                setProyecto(proyectoActual);
            }
        }
        fetchTareaProyecto();
    }, [params.id, getTasks, getProyect, tasks]);

    const onSubmit = handleSubmit(async (data) => {
        await createPrueba(data);
        navigate(`/prueba`);
    });

    return (
        <div className='bg-zinc-800 max-w-md w-full ml-40 p-10 rounded-md'>

            <h1 className='text-2xl font-bold text-center'>Nueva Prueba</h1>

            {tarea && proyecto ? (
                <div className="mb-4">
                    <h3 className="text-lg">Proyecto: {proyecto.nombre}</h3>
                    <h3 className="text-lg">Tarea: {tarea.nombre}</h3>
                </div>
            ) : (
                <p>Cargando tarea y proyecto...</p>
            )}

            <form onSubmit={onSubmit}>

                {/* fk_id_tarea */}
                <input value={params.id}
                    type="hidden"
                    {...register('fk_id_tarea')} 
                />

                 {/* fk_id_plan_prueba*/}
                 <input value={params.plan}
                    type="hidden"
                    {...register('fk_id_plan_prueba')} 
                />

                {/* Campo Descripcion */}
                <label htmlFor="definicion">Descripción</label>
                <textarea
                    rows="3"
                    placeholder="Definición"
                    {...register("definicion")}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    required
                ></textarea>

                {/* Campo Datos */}
                <label htmlFor="datos">Datos o Evidencias</label>
                <textarea
                    rows="3"
                    placeholder="Datos o Evidencias"
                    {...register("datos")}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                ></textarea>

                {/* Campo Criterio */}
                <label htmlFor="criterioAceptacion">Criterio de Aceptación</label>
                <textarea
                    rows="3"
                    placeholder="Criterio de Aceptacion"
                    {...register("criterioAceptacion")}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                ></textarea>

                {/* Radio para Aprobado o no aprobado */}
                <label htmlFor="aprobacion">Aprobación</label>
                <div className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'>
                    <label className='mr-4'>
                        <input
                            type="radio"
                            value="false"
                            {...register("aprobacion", { required: true })}
                            className="mr-1"
                            defaultChecked
                        />
                        No
                    </label>
                    <label >
                        <input
                            type="radio"
                            value="true"
                            {...register("aprobacion", { required: true })}
                            className="mr-1"
                        />
                        Sí
                    </label>
                </div>
                
                {/* Campo tipo prueba */}
                <label htmlFor="fk_id_tipo_prueba">Estado</label>
                <select {...register('fk_id_tipo_prueba')} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'>
                    <option value="1">Prueba Unitaria</option>
                    <option value="2">Prueba Fucional</option>
                    <option value="3">Prueba de Integración</option>
                    <option value="4">Prueba de Regresión</option>
                </select>

                <button className='bg-green-600 hover:bg-green-700 px-8 py-2 rounded-md mt-5'>
                    Guardar
                </button>
            </form>
        </div>
    );
}

export default CreatePruebaForm;
