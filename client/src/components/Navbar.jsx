import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {

    //const { isAuthenticated, logout, user } = useAuth();
    return (
        <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">

            <ul className="flex gap-x-2">
                <li>
                    <Link>Welcome </Link>
                </li>
                <li>
                    <Link className="bg-indigo-500 px-4 py-4 rounded-sm"
                        to='/add-task'>Add Task</Link>
                </li>
                <li>
                    <Link to='/' onClick={() => { }}>Log Out</Link>
                </li>
                <li>
                    <Link className="bg-indigo-500 px-4 py-4 rounded-sm"
                        to='/login'>Login</Link>
                </li>
                <li>
                    <Link className="bg-indigo-500 px-4 py-4 rounded-sm"
                        to='/register'>Register</Link>
                </li>
            </ul>
        </nav>
    )
}


export default Navbar;