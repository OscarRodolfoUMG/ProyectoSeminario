import { useEffect, useState } from "react";
import { useConsultas } from "../../context/consultasContext";

//Componente para cargar los resultador de las consultas
function ConsultasPage() {
    const { 
        obtenerCantidadDesarrolladores, 
        obtenerCantidadAnalistas, 
        obtenerCantidadProyectos, 
        obtenerCantidadPruebas, 
        obtenerTareasCompletadas, 
        obtenerTareasNoCompletadas, 
        obtenerTareasPendientes 
    } = useConsultas();

    const [consultas, setConsultas] = useState({
        desarrolladores: 0,
        analistas: 0,
        proyectos: 0,
        pruebas: 0,
        tareasCompletadas: 0,
        tareasNoCompletadas: 0,
        tareasPendientes: 0
    });

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const devs = await obtenerCantidadDesarrolladores();
                const analysts = await obtenerCantidadAnalistas();
                const projects = await obtenerCantidadProyectos();
                const tests = await obtenerCantidadPruebas();
                const completedTasks = await obtenerTareasCompletadas();
                const incompleteTasks = await obtenerTareasNoCompletadas();
                const pendingTasks = await obtenerTareasPendientes();

                setConsultas({
                    desarrolladores: devs?.cantidadDesarrolladores || 0,
                    analistas: analysts?.cantidadAnalistas || 0,
                    proyectos: projects?.cantidadProyectos || 0,
                    pruebas: tests?.cantidadPruebas || 0,
                    tareasCompletadas: completedTasks?.cantidadTareasCompletadas || 0,
                    tareasNoCompletadas: incompleteTasks?.cantidadTareasNoCompletadas || 0,
                    tareasPendientes: pendingTasks?.cantidadTareasPendientes || 0
                });
            } catch (error) {
                console.log("Error al obtener estadísticas:", error);
            }
        };

        obtenerDatos();
    }, [
        obtenerCantidadDesarrolladores, 
        obtenerCantidadAnalistas, 
        obtenerCantidadProyectos, 
        obtenerCantidadPruebas, 
        obtenerTareasCompletadas, 
        obtenerTareasNoCompletadas, 
        obtenerTareasPendientes
    ]);

    return (
        <div className="ml-40">
            <h1 className="text-4xl font-bold mb-8">Informe General</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Proyectos */}
                <div className="bg-gray-700 p-6 rounded-md text-center shadow-md">
                    <h2 className="text-xl font-semibold">Proyectos</h2>
                    <p className="text-3xl mt-2">{consultas.proyectos}</p>
                </div>

                {/* Desarrolladores */}
                <div className="bg-gray-700 p-6 rounded-md text-center shadow-md">
                    <h2 className="text-xl font-semibold">Desarrolladores</h2>
                    <p className="text-3xl mt-2">{consultas.desarrolladores}</p>
                </div>

                {/* Analistas */}
                <div className="bg-gray-700 p-6 rounded-md text-center shadow-md">
                    <h2 className="text-xl font-semibold">Analistas de Calidad</h2>
                    <p className="text-3xl mt-2">{consultas.analistas}</p>
                </div>

                {/* Pruebas */}
                <div className="bg-gray-700 p-6 rounded-md text-center shadow-md">
                    <h2 className="text-xl font-semibold">Pruebas</h2>
                    <p className="text-3xl mt-2">{consultas.pruebas}</p>
                </div>

                {/* Tareas Completadas */}
                <div className="bg-gray-700 p-6 rounded-md text-center shadow-md">
                    <h2 className="text-xl font-semibold">Tareas Completadas</h2>
                    <p className="text-3xl mt-2">{consultas.tareasCompletadas}</p>
                </div>

                {/* Tareas No Completadas */}
                <div className="bg-gray-700 p-6 rounded-md text-center shadow-md">
                    <h2 className="text-xl font-semibold">Tareas No Completadas</h2>
                    <p className="text-3xl mt-2">{consultas.tareasNoCompletadas}</p>
                </div>

                {/* Tareas Pendientes */}
                <div className="bg-gray-700 p-6 rounded-md text-center shadow-md">
                    <h2 className="text-xl font-semibold">Tareas Pendientes</h2>
                    <p className="text-3xl mt-2">{consultas.tareasPendientes}</p>
                </div>
            </div>
        </div>
    );
}

export default ConsultasPage;
