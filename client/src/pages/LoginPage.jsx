import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

//Componente de Formulario de Inicio de sesión
function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { signin, errors: signinErrors, isAuthenticated, user } = useAuth();
    const navigate = useNavigate();

    const onSubmit = handleSubmit((data) => {
        signin(data);
    });

    useEffect(() => {
        if (isAuthenticated) {
            switch (user.fk_tipo_usuario) {
                case 1:
                    navigate("/users");
                    break;
                case 2:
                    navigate("/proyects");
                    break;
                case 3:
                    navigate("/planPrueba");
                    break;
                case 4:
                    navigate("/tasks");
                    break;
            }
        }
    }, [isAuthenticated]);

    return (
        <div className="flex h-[calc(100vh-100px)] items-center justify-center">
            <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
                {
                    signinErrors.map((error, i) => (
                        <div className='bg-red-500 p-2 text-white text-center my-2' key={i}>
                            {error}
                        </div>
                    ))
                }
                <h1 className='text-2xl font-bold my-2 text-center'>Iniciar Sesión</h1>
                <form onSubmit={onSubmit}>
                    <input type="email" {...register("email", { required: true })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='Email' />
                    {
                        errors.email && (
                            <p className='text-red-500'>Email is required</p>
                        )
                    }
                    <input type="password" {...register("password", { required: true })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='Password' />
                    {
                        errors.password && (
                            <p className='text-red-500'>Password is required</p>
                        )
                    }
                    <button type="submit"
                        className='bg-zinc-800  border-2 border-blue-700  text-white px-8 py-2 mt-5 rounded-md my-2 relative overflow-hidden group transition-all duration-300'>
                        <span className="relative z-10 font-bold">Ingresar</span>
                        <div className="absolute inset-0 bg-blue-700 w-0 h-full group-hover:w-full transition-all duration-500 ease-out"></div>
                    </button>
                </form>

            </div>
        </div>
    )
}

export default LoginPage