import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useFallas } from '../../context/FallaContext'; 
import { usePruebas } from '../../context/PruebaContext';
import { useTasks } from '../../context/TaskContext';

//Componente de formulario para registrar un Error
function CreateFallaForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createFalla } = useFallas();
    const { getPrueba, pruebas } = usePruebas();
    const { getTasks, tasks } = useTasks();

    const [clasificaciones, setClasificaciones] = useState([]);
    const [prueba, setPrueba] = useState(null);
    const [tarea, setTarea] = useState(null);

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        async function fetchData() {
            await getPrueba(params.id);
        }
        fetchData();
    }, [params.id]);

    const onSubmit = handleSubmit(async (data) => {
        await createFalla(data);
        navigate(`/falla`);
    });

    return (
        <div className='bg-zinc-800 max-w-md w-full ml-40 p-10 rounded-md'>
            <h1 className='text-2xl font-bold text-center mb-4'>Reportar Error</h1>

            {pruebas || tarea ? (
                <div className="mb-4">
                    <h3 className="text-lg">Prueba: {pruebas[0].definicion}</h3>
                </div>
            ) : (
                <p>Cargando datos de prueba y tarea...</p>
            )}
            
            <form onSubmit={onSubmit}>

                {/* fk_id_prueba */}
                <input value={pruebas[0].id_prueba}
                    type="hidden"
                    {...register('fk_id_prueba')} 
                />

                {/* fk_id_tarea */}
                <input value={pruebas[0].fk_id_tarea}
                    type="hidden"
                    {...register('fk_id_tarea')} 
                />

                <label htmlFor="descripcion">Descripción de Error</label>
                <textarea
                    rows="3"
                    placeholder="Descripción detallada de la falla"
                    {...register("descripcion")}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    required
                ></textarea>

                {/* tipo_preba */}
                <label htmlFor="fk_id_clasificacion_falla">Clasificación de Error</label>
                <select {...register('fk_id_clasificacion_falla')} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' required>
                    <option value="">Escoga una Clasificación</option>
                    <option value="1">Error de Cálculo</option>
                    <option value="2">Error de Lógica</option>
                    <option value="3">Error de Integración</option>
                    <option value="4">Error de Validación</option>
                    <option value="5">Error de Regresión</option>
                </select>

                <button className='bg-green-600 hover:bg-green-700 px-8 py-2 rounded-md mt-5'>
                    Guardar Nuevo
                </button>
            </form>
        </div>
    );
}

export default CreateFallaForm;
