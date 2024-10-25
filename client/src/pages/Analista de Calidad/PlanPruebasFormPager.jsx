import { useForm } from 'react-hook-form';
import { useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';

import { usePlanPruebas } from '../../context/PlanPruebaContext';
import { useProyects } from '../../context/ProyectContext';
import PlanPruebaProyectCard from './PlanPruebaProyectCard';

//Componente formulario para listar los planes de prueba
function PlanPruebaFormPage() {
    const { register, handleSubmit, setValue } = useForm();
    const { createPlanPrueba, getPlanPrueba, updatePlanPrueba } = usePlanPruebas();
    const { getProyects, proyects } = useProyects();

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        getProyects();
    }, []);

    const onSumbit = handleSubmit((data) => {

        if (params.id) {
            updatePlanPrueba(params.id, data);
        } else {
            createPlanPrueba(data);
        }
        navigate('/planPrueba');
    });

    return (

        <div className="ml-40">
            {proyects.length === 0 && (
                <h1 className="text-2xl mt-20">No Proyects</h1>
            )}
            <div className="grid grid-cols-1 gap-2 mt-10">
                <>
                    {
                        proyects.map((proyect) => (

                            <PlanPruebaProyectCard key={proyect.id_proyecto} proyect={proyect} />
                        ))
                    }
                </>
            </div>
        </div>
    )
}
export default PlanPruebaFormPage;