import { BrowserRouter, Routes, Route } from "react-router-dom";
//import { AuthProvider } from "./context/AuthContext.jsx";

//import RegisterPage from './pages/RegisterPage.jsx';
//import LoginPage from "./pages/loginPage.jsx";
import TasksPage from "./pages/TasksPage.jsx";
import TaskFormPage from "./pages/TaskFormPager.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
//import ProtectedRoute from "./ProtectedRoute.jsx";
import { TaskProvider } from "./context/TaskContext.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    
      <TaskProvider>
        <BrowserRouter>
          <main className="container mx-auto px-10">
            <Navbar />
            <Routes>
              {/* Usuarios Publicos */}
              <Route path="/" element={<HomePage />} />
              {/* <Route path="/login" element={<LoginPage />} /> */}
              {/* <Route path="/register" element={<RegisterPage />} /> */}

              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/add-task" element={<TaskFormPage />} />
              <Route path="/tasks/:id" element={<TaskFormPage />} />
              <Route path="/profile" element={<ProfilePage />} />


            </Routes>
          </main>
        </BrowserRouter>
      </TaskProvider>
  )
}

export default App;