import { useState } from "react";

function Benchmark() {
    const [numTrials, setNumTrials] = useState(10);

    return (
        <div>
            <div className="flex flex-col max-w-6xl p-4 mx-auto">
                <h1 className="text-2xl font-bold">Benchmark</h1>
            </div>
        </div>
    );
}

export default Benchmark;