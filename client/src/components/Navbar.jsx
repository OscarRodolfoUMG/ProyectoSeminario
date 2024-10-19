import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {

    //const { isAuthenticated, logout, user } = useAuth();
    return (
        <nav className="bg-zinc-700 w-36 h-screen px-0 py-5">
            <ul className="flex flex-col gap-y-4">
                <li className="self-center text-2xl font-bold py-5">
                    SGPCC
                </li>
                <li className="self-center ">
                    <Link className="text-white py-2 px-12 hover:bg-black" to='/'>Inicio</Link>
                </li>
                <li className="self-center flex-1 mr-2">
                    <Link className="text-white py-2 px-12 hover:bg-black" to='/tasks'>Tareas</Link>
                </li>
                <li className="self-center flex-1 mr-2">
                    <Link className="text-white hover:bg-black py-2 px-6" to='/add-task'>Nueva Tarea</Link>
                </li>
                
            </ul>
        </nav>
    )
}

export default Navbar;




// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// function Navbar() {

//     //const { isAuthenticated, logout, user } = useAuth();
//     return (
//         <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">

//             <ul className="flex gap-x-2">
//                 <li>
//                     <Link>Welcome </Link>
//                 </li>
//                 <li>
//                     <Link className="bg-indigo-500 px-4 py-4 rounded-sm"
//                         to='/add-task'>Add Task</Link>
//                 </li>
//                 <li>
//                     <Link to='/' onClick={() => { }}>Log Out</Link>
//                 </li>
//                 <li>
//                     <Link className="bg-indigo-500 px-4 py-4 rounded-sm"
//                         to='/login'>Login</Link>
//                 </li>
//                 <li>
//                     <Link className="bg-indigo-500 px-4 py-4 rounded-sm"
//                         to='/register'>Register</Link>
//                 </li>
//             </ul>
//         </nav>
//     )
// }


// export default Navbar;