import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { usePruebas } from '../../context/PruebaContext';
import { useTasks } from '../../context/TaskContext';
import { useProyects } from '../../context/ProyectContext';
import { useUsers } from '../../context/UserContext';

//Componente del formulario para editar una prueba
function EditPruebaForm() {
    const { register, handleSubmit, setValue } = useForm();
    const { getPrueba, updatePrueba, pruebas } = usePruebas();
    const { getTasks, getTask, tasks } = useTasks();
    const { getProyects, getProyect, proyects } = useProyects();
    const { getUsers, users } = useUsers();

    const [tarea, setTarea] = useState("");
    const [proyecto, setProyecto] = useState("");

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        async function fetchData() {
            await getPrueba(params.id);
        }
        fetchData();
    }, [params.id]);

    useEffect(() => {
        async function fetchData() {
            await getTask(pruebas[0].fk_id_tarea);
        }
        fetchData();
    }, [pruebas]);

    useEffect(() => {
        async function fetchData() {
            await getProyect(tasks[0].fk_id_proyecto);
        }
        fetchData();
    }, [tasks]);

    useEffect(() => {
        async function loadPrueba() {
            setValue('definicion', pruebas[0].definicion);
            setValue('datos', pruebas[0].datos);
            setValue('criterioAceptacion', pruebas[0].criterioaceptacion);
            setValue('aprobacion', pruebas[0].aprobacion ? 'true' : 'false');
            setValue('fk_id_tipo_prueba', pruebas[0].fk_id_tipo_prueba);
            const nTarea = tasks.find(t => t.id_tarea === pruebas[0].fk_id_tarea);
            if (nTarea) {
                setTarea(nTarea.nombre);
            }
            const nProyect = proyects.find(p => p.id_proyecto === tasks[0].fk_id_proyecto);
            if (nProyect) {
                setProyecto(nProyect.nombre);
            }

        }
        loadPrueba();
    }, [pruebas, tasks, proyects, setValue]);

    const onSubmit = handleSubmit(async (data) => {
        await updatePrueba(params.id, data);
        navigate(`/prueba`);
    });

    return (
        <div className='bg-zinc-800 max-w-md w-full ml-40 p-10 rounded-md'>

            {tarea || proyecto ? (
                <div className="mb-4">
                    <h3 className="text-lg">Proyecto: {proyecto}</h3>
                    <h3 className="text-lg">Tarea: {tarea}</h3>
                </div>
            ) : (
                <p>Cargando tarea y proyecto...</p>
            )}

            <form onSubmit={onSubmit}>

                {/* fk_id_tarea */}
                <input value={pruebas[0].fk_id_tarea}
                    type="hidden"
                    {...register('fk_id_tarea')}
                />

                {/* fk_id_plan_prueba */}
                <input value={pruebas[0].fk_id_plan_prueba}
                    type="hidden"
                    {...register('fk_id_plan_prueba')}
                />

                <label htmlFor="definicion">Definición Prueba</label>
                <textarea
                    rows="3"
                    placeholder="Definición"
                    {...register("definicion")}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    required
                ></textarea>

                <label htmlFor="datos">Datos o Evidencias</label>
                <textarea
                    rows="3"
                    placeholder="Datos o Evidencias"
                    {...register("datos")}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                ></textarea>

                <label htmlFor="criterioAceptacion">Criterio de Aceptación</label>
                <textarea
                    rows="3"
                    placeholder="Criterio de Aceptacion"
                    {...register("criterioAceptacion")}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                ></textarea>

                <label htmlFor="aprobacion">Aprobación</label>
                <div className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'>
                    <label className='mr-4'>
                        <input
                            type="radio"
                            value="false"
                            {...register("aprobacion", { required: true })}
                            className="mr-1"
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

                {/* tipo_prueba */}
                <label htmlFor="fk_id_tipo_prueba">Tipo de Prueba</label>
                <select {...register('fk_id_tipo_prueba')} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'>
                    <option value="1">Prueba Unitaria</option>
                    <option value="2">Prueba Funcional</option>
                    <option value="3">Prueba de Integración</option>
                    <option value="4">Prueba de Regresión</option>
                </select>

                <button className='bg-green-600 hover:bg-green-700 px-8 py-2 rounded-md mt-5'>
                    Guardar Cambios
                </button>
            </form>
        </div>
    );
}

export default EditPruebaForm;
