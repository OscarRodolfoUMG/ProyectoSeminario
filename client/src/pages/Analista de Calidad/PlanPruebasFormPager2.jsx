import { useForm } from 'react-hook-form';
import { useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';

import { usePlanPruebas } from '../../context/PlanPruebaContext';
import { useProyects } from '../../context/ProyectContext.jsx';

//Componente de formulario para crear un plan de pruebas
function PlanPruebaFormPage2() {
    const { register, handleSubmit, setValue } = useForm();
    const { createPlanPrueba, getPlanPrueba, updatePlanPrueba } = usePlanPruebas();
    const { proyects, getProyects } = useProyects();
    const { getPlanPruebas, planPruebas } = usePlanPruebas();

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        getPlanPruebas();
    }, []);

    useEffect(() => {
        if (params.id) {
            async function loadPlanPrueba() {
                const planPrueba = await getPlanPrueba(params.id);
                setValue('descripcion', planPrueba.descripcion);
                setValue('anotaciones', planPrueba.anotaciones);
                setValue('fecha', planPrueba.fecha);
                setValue('fk_id_proyecto', planPrueba.fk_id_proyecto);
            }
            loadPlanPrueba();
        }
        getProyects();
    }, [params.id]);

    const onSubmit = handleSubmit((data) => {
        if (params.id) {
            updatePlanPrueba(params.id, data);
        }
        navigate('/planPrueba');
    });

    return (
        <div className="ml-40">

            <button
                onClick={() => navigate(`/add-prueba/${params.id}`)}
                className='bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-md mb-5'
            >
                Agregar Prueba
            </button>

            <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">

                <form onSubmit={onSubmit}>
                    {/* DESCRIPCIÓN */}
                    <label htmlFor="descripcion">Descripción</label>
                    <textarea
                        rows="3"
                        placeholder="Descripción"
                        {...register("descripcion")}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        required
                    ></textarea>

                    {/* ANOTACIONES */}
                    <label htmlFor="anotaciones">Anotaciones</label>
                    <textarea
                        rows="3"
                        placeholder="Anotaciones"
                        {...register("anotaciones")}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    ></textarea>

                    {/* FECHA */}
                    <label htmlFor="fecha">Fecha</label>
                    <input
                        type="date"
                        {...register("fecha")}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    />

                    <button type="submit"
                        className='bg-zinc-800 border-2 border-green-700 text-white px-8 py-2 mt-5 rounded-md my-2 relative overflow-hidden group transition-all duration-300'>
                        <span className="relative z-10 font-bold">Guardar</span>
                        <div className="absolute inset-0 bg-green-700 w-0 h-full group-hover:w-full transition-all duration-500 ease-out"></div>
                    </button>
                </form>
            </div>
        </div>
    )
}
export default PlanPruebaFormPage2;