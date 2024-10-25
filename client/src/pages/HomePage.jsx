
//Componente para la pagina de Inicio del Sitio
function HomePage() {
    return (
        <div className="bg-zinc-900 flex flex-col md:flex-row justify-center items-center gap-8 rounded-md mt-20 p-10 bg-opacity-100">
            
            <div className="bg-slate-600 text-white flex items-center justify-center rounded-md h-64 w-full md:w-1/2">
                <h1 className="text-4xl font-bold">Bienvenido</h1>
            </div>
            
            <div className="bg-gradient-to-br from-blue-900 via-blue-900 to-black text-white flex items-center justify-center rounded-md h-64 w-full md:w-1/2">
                <h1 className="text-3xl font-bold text-center p-3">
                    Sistema de Gestión de Proyectos y Control de Calidad
                </h1>
            </div>
        </div>
    );
}

export default HomePage;
