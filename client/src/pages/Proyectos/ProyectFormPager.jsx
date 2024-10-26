import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { useProyects } from '../../context/ProyectContext';

function ProyectFormPage() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { createProyect, getProyect, updateProyect, errors: registerErrors } = useProyects();

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        async function loadProyect() {
            if (params.id) {
                const proyect = await getProyect(params.id);

                setValue('nombre', proyect.nombre)
                setValue('fecha_inicio', proyect.fecha_inicio)
                setValue('fecha_final', proyect.fecha_final)
            }
        }
        loadProyect();
    }, []);

    const onSumbit = handleSubmit( async (data) => {
        if (params.id) {
            await updateProyect(params.id, data);
        } else {
            await createProyect(data);
        }
        navigate('/proyects');
    });

    return (
        <div className='bg-zinc-800 max-w-md w-full ml-40 p-10 rounded-md'>
            <h1 className='text-2xl font-bold  text-center'>Nuevo Proyecto</h1>
            <form onSubmit={onSumbit}>
                <label htmlFor="nombre">Nombre</label>
                <input
                    type="text"
                    placeholder="Nombre"
                    {...register("nombre")}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    autoFocus
                    required
                    autoComplete='off'
                />

                <label htmlFor="fecha_inicio">Fecha Creación</label>

                <input type="date" {...register('fecha_inicio')}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                />

                <label htmlFor="fecha_final">Fecha Entrega</label>

                <input type="date" {...register('fecha_final')}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                />

                <button className='bg-green-600 hover:bg-green-700 px-8 py-2 rounded-md mt-5'>Guardar</button>
            </form>
        </div>
    )
}
export default ProyectFormPage;