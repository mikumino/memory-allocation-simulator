import { Link, useLocation } from "react-router-dom";
 
const Navbar = () => {
    let pathname = useLocation().pathname;
    return(
        <div className="navbar shadow-lg rounded-lg">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-lg font-bold">Memory Allocation Simulator 📝</Link>
            </div>
            <div className="flex-none">
                <Link to="/" className={`btn btn-ghost ${pathname == '/' ? 'text-accent' : ''}`}>Simulator</Link>
                <Link to="/single-test" className={`btn btn-ghost ${pathname == '/single-test' ? 'text-accent' : ''}`}>Single Test</Link>
                <Link to="/benchmark" className={`btn btn-ghost ${pathname == '/benchmark' ? 'text-accent' : ''}`}>Benchmark</Link>
            </div>
        </div>
    )

}

export default Navbar;