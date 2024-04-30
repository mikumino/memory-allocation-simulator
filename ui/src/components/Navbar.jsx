const Navbar = () => {
    return(
        <div className="navbar shadow-lg rounded-lg">
            <div className="flex-1">
                <a href="/" className="btn btn-ghost text-lg font-bold">Memory Allocation Simulator 📝</a>
            </div>
            <div className="flex-none">
                <a href="/benchmark" className="btn btn-ghost">Benchmark</a>
            </div>
        </div>
    )

}

export default Navbar;