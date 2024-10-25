import { useEffect } from "react";
import { useTasks } from "../context/TaskContext"
import TaskCard from "../components/TaskCard";
import { Link } from "react-router-dom";

//Componente para listar las tarjetas de tareas
function TasksPage() {
    const { getTasks, tasks } = useTasks();

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <div  className="ml-40"> 
            {/* <Link
                className="bg-green-700 hover:bg-green-500 text-white py-2 px-4 rounded-md"
                to='/add-task'
            >
                Nueva Tarea
            </Link> */}
            {tasks.length === 0 &&(
                <h1 className="text-2xl mt-20">No hay Tareas</h1>
            )}
            <div className="flex flex-col gap-2 mt-10"> 
                {
                    tasks.map((task) => (
                        <TaskCard key={task.id_tarea} task={task} />
                    ))
                }
            </div>
        </div>
    )
}
export default TasksPage