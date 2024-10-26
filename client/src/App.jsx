import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";

import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

import TasksPage from "./pages/TasksPage.jsx";
import TaskFormPage from "./pages/TaskFormPager.jsx";
import EditTaskFormPage from "./pages/EditTaskFormPager.jsx";

import UsersPage from "./pages/Administradores/UsersPage.jsx";
import UserFormPage from "./pages/Administradores/UserFormPager.jsx";

import ProyectsPage from "./pages/Proyectos/ProyectsPage.jsx";
import ProyectFormPage from "./pages/Proyectos/ProyectFormPager.jsx";

import AsignacionesPage from "./pages/Proyectos/AsignacionesPage.jsx";
import AsignacionFormPage from "./pages/Proyectos/AsignacionFormPager.jsx";

import PlanPruebasPage from "./pages/Analista de Calidad/PlanPruebasPage.jsx";
import PlanPruebasFormPager from "./pages/Analista de Calidad/PlanPruebasFormPager.jsx";
import PlanPruebasFormPager2 from "./pages/Analista de Calidad/PlanPruebasFormPager2.jsx";

import PruebaPage from "./pages/Analista de Calidad/PruebaPage.jsx";
import PruebaFormPager from "./pages/Analista de Calidad/PruebaFormPager.jsx"
import CreatePruebaForm from "./pages/Analista de Calidad/CreatePruebaForm.jsx"
import EditPruebaForm from "./pages/Analista de Calidad/EditPruebaForm.jsx";

import FallaPage from "./pages/Fallas/FallaPage.jsx";
import CreateFallaForm from "./pages/Fallas/CreateFallaForm.jsx";

import InformesPage from "./pages/Informes/InformesPage.jsx"

import { TaskProvider } from "./context/TaskContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { ProyectProvider } from "./context/ProyectContext.jsx";
import { User_ProyectProvider } from "./context/UserProyectContext.jsx";
import { PlanPruebaProvider } from "./context/PlanPruebaContext.jsx";
import { PruebaProvider } from "./context/PruebaContext.jsx";
import { FallaProvider } from "./context/FallaContext.jsx";
import { ConsultasProvider } from "./context/consultasContext.jsx";

import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <ProyectProvider>
          <PlanPruebaProvider>
            <PruebaProvider>
              <User_ProyectProvider>
                <TaskProvider>
                  <FallaProvider>
                    <ConsultasProvider>
                      <BrowserRouter>
                        <Navbar />
                        <main className="flex-1 container mx-auto px-10 p-10 ">

                          <Routes>
                            {/* Usuarios Publicos */}
                            <Route path="/" element={<HomePage />} />
                            <Route path="/login" element={<LoginPage />} />

                            {/* Rutas para las que se necesita usuario y contraseña */}
                            <Route element={<ProtectedRoute />}>
                              {/* Rutas de Tareas */}
                              <Route path="/tasks" element={<TasksPage />} />
                              <Route path="/add-task" element={<TaskFormPage />} />
                              <Route path="/tasks/:id" element={<TaskFormPage />} />
                              <Route path="/edit-tasks/:id" element={<EditTaskFormPage />} />

                              {/* Rutas para Administrador */}
                              <Route path="/users" element={<UsersPage />} />
                              <Route path="/add-user" element={<UserFormPage />} />
                              <Route path="/users/:id" element={<UserFormPage />} />
                              
                              {/* Rutas para Gerente de Proyecto */}
                              <Route path="/proyects" element={<ProyectsPage />} />
                              <Route path="/add-proyect" element={<ProyectFormPage />} />
                              <Route path="/proyects/:id" element={<ProyectFormPage />} />

                              <Route path="/asignaciones" element={<AsignacionesPage />} />
                              <Route path="/add-asignaciones" element={<AsignacionFormPage />} />
                              <Route path="/asignaciones/:id" element={<AsignacionFormPage />} />

                              {/* Rutas para Analista de Calidad */}
                              <Route path="/planPrueba" element={<PlanPruebasPage />} />
                              <Route path="/edit-planPrueba/:id" element={<PlanPruebasFormPager2 />} />
                              <Route path="/add-planPrueba" element={<PlanPruebasFormPager />} />
                              <Route path="/planPrueba/:id" element={<PlanPruebasFormPager />} />

                              <Route path="/prueba" element={<PruebaPage />} />
                              <Route path="/add-prueba/:id" element={<PruebaFormPager />} />
                              <Route path="/create-prueba/:id/:plan" element={<CreatePruebaForm />} />
                              <Route path="/edit-prueba/:id" element={<EditPruebaForm />} />

                              <Route path="/falla" element={<FallaPage />} />
                              <Route path="/create-falla/:id" element={<CreateFallaForm />} />

                              {/* Ruta de Informes */}
                              <Route path="/informes" element={<InformesPage />} />

                            </Route>

                          </Routes>
                        </main>
                      </BrowserRouter>
                    </ConsultasProvider>
                  </FallaProvider>
                </TaskProvider>
              </User_ProyectProvider>
            </PruebaProvider>
          </PlanPruebaProvider>
        </ProyectProvider>
      </UserProvider>
    </AuthProvider>
  )
}

export default App;