import { useState } from "react";
import Navbar from "../components/Navbar";

function Benchmark() {
    const [numTrials, setNumTrials] = useState(10);

    return (
        <>
        <Navbar />
        <div>
            <div className="flex flex-col max-w-6xl p-4 mx-auto">
                <h1 className="text-2xl font-bold p-4">Benchmark</h1>
            </div>
        </div>
        </>
    );
}

export default Benchmark;