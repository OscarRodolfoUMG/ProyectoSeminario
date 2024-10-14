import { useEffect } from "react";
import { useTasks } from "../context/TaskContext"
import TaskCard from "../components/TaskCard";



function TasksPage() {
    const { getTasks, tasks } = useTasks();

    useEffect(() => {
        getTasks();
    }, []);

    if (tasks.length === 0) return (<h1>No tasks</h1>);


    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
            <>
                {
                    tasks.map((task) => (

                        <TaskCard key={task.id_tarea} task={task} />
                    ))
                }
            </>
        </div>
    )
}
export default TasksPage