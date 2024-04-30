import { Link } from "react-router-dom";
 
const Navbar = () => {
    return(
        <div className="navbar shadow-lg rounded-lg">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-lg font-bold">Memory Allocation Simulator 📝</Link>
            </div>
            <div className="flex-none">
                <Link to="/" className="btn btn-ghost">Simulator</Link>
                <Link to="benchmark" className="btn btn-ghost">Benchmark</Link>
            </div>
        </div>
    )

}

export default Navbar;