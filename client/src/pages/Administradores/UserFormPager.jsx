import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { useUsers } from '../../context/UserContext';

//Componente para la Cracion y Actualizacion de Usuarios
function UserFormPage() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { createUser, getUser, updateUser, errors: registerErrors } = useUsers();
    
    const navigate = useNavigate();
    const params = useParams();

    //Carga los datos si recibe un parametro para actualizar
    useEffect(() => {
        async function loadUser() {
            if (params.id) {
                const user = await getUser(params.id);
                setValue('nombre', user.nombre)
                setValue('email', user.email)
                setValue('pass', user.pass)
                setValue('fk_tipo_usuario', user.fk_tipo_usuario)
            }
        }
        loadUser();
    }, []);

    //Si contiene un parametro actualiza, si es nuevo, guarda
    const onSumbit = handleSubmit( async (values) => {
        if (params.id) {
            await updateUser(params.id, values);
        } else {
            await createUser(values);
        }
        navigate('/users');
    });

    return (
        <div className='bg-zinc-800 max-w-md w-full ml-40 p-10 rounded-md'>

            <h1 className='text-2xl font-bold  text-center'>Nuevo Usuario</h1>

            <form onSubmit={onSumbit}>
                <label htmlFor="nombre">Nombre</label>

                {/* Campo Nombre Usuario */}
                <input
                    type="text"
                    placeholder="Nombre"
                    {...register("nombre")}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    autoFocus
                    required
                    autoComplete='off'
                />
                {/* Campo Correo Electronico */}
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    autoComplete='off'
                    required
                />
                {
                    errors.email && (
                        <p className='text-red-500'>Email is required</p>
                    )
                }
                {/* Campo Contraseña */}
                <label htmlFor="pass">Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    {...register("pass")}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    required
                />

                {/* Campo Tipo Usuario */}
                <label htmlFor="fk_tipo_usuario">Tipo Usuario</label>
                <select {...register('fk_tipo_usuario')} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' required>
                    <option value="">Selecionar</option>
                    <option value="1">Administrador</option>
                    <option value="2">Gerente de Proyecto</option>
                    <option value="3">Analista de Calidad</option>
                    <option value="4">Desarrollador</option>
                </select>

                <button className='bg-indigo-800 hover:bg-indigo-500 px-8 py-2 rounded-md mt-5'>Guardar</button>
            </form>
        </div>
    )
}
export default UserFormPage;