import { useForm } from 'react-hook-form';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';

import { usePruebas } from '../../context/PruebaContext';
import { useProyects } from '../../context/ProyectContext';
import { useTasks } from '../../context/TaskContext';
import { usePlanPruebas } from '../../context/PlanPruebaContext';
import PruebaTareaCard from './PruebaTareaCard';

function PruebaFormPage() {
    const { getPlanPrueba, planPruebas } = usePlanPruebas();
    const { getProyect, proyets } = useProyects();
    const { getTasks, tasks } = useTasks();
    const { pruebas } = usePruebas();

    const [idProyecto, setIdProyecto] = useState(null);
    const [filteredTasks, setFilteredTasks] = useState([]);

    const navigate = useNavigate();
    const params = useParams();

    // Primer useEffect: obtener el id del proyecto asociado al plan de prueba
    useEffect(() => {
        async function fetchData() {
            await getPlanPrueba(params.id);  // Obtener el plan de prueba
            const filtered = planPruebas.find(p => p.id_plan_prueba === parseInt(params.id));  // Encontrar el plan de prueba correcto
            if (filtered) {
                setIdProyecto(filtered.fk_id_proyecto);  // Guardar el ID del proyecto
            }
        }
        fetchData();
    }, [params.id, planPruebas]);

    // Segundo useEffect: obtener las tareas filtradas según el proyecto
    useEffect(() => {
        async function fetchData() {
            if (idProyecto) {  // Asegurarse de que idProyecto esté disponible
                await getTasks();  // Obtener todas las tareas
                const filtered = tasks.filter(task => task.fk_id_proyecto === idProyecto);  // Filtrar tareas por el ID del proyecto
                setFilteredTasks(filtered);  // Guardar las tareas filtradas
            }
        }
        fetchData();
    }, [idProyecto]);

    console.log("tasks: ", filteredTasks);

    return (

        <div className="ml-40">
            {filteredTasks.map((task) => {
                const planPrueba = planPruebas.find(p => p.id_plan_prueba === parseInt(params.id));
                return (
                    <PruebaTareaCard key={task.id_tarea} task={task} planPrueba={planPrueba} />
                );
            })}
        </div>
    )
}
export default PruebaFormPage;