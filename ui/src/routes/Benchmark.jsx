import { useState } from "react";
import Navbar from "../components/Navbar";
import KBInput from "../components/KBInput";
import MemoryState from "../components/MemoryState";
import MemoryStateTable from "../components/MemoryStateTable";
import ProcessPoolTable from "../components/ProcessPoolTable";

function Benchmark() {
    // React useStates
    // Memory initialization
    const [memorySize, setMemorySize] = useState(1024);
    const [minBlockSize, setMinBlockSize] = useState(8);
    const [maxBlockSize, setMaxBlockSize] = useState(512);
    // Memory states
    const [firstFitMemoryState, setfirstFitMemoryState] = useState(null);
    const [nextFitMemoryState, setNextFitMemoryState] = useState(null);
    const [bestFitMemoryState, setBestFitMemoryState] = useState(null);
    const [worstFitMemoryState, setWorstFitMemoryState] = useState(null);
    // Initial memory state
    const [initialMemoryState, setInitialMemoryState] = useState(null);
    // Process initialization
    const [requestPercentage, setRequestPercentage] = useState(50);
    // Process pool
    const [processPool, setProcessPool] = useState([]);

    // Event Handlers
    const handleInitializeMemory = () => {
        // Should be the same as the one in the Simulator
        // Try to send a POST request to the API
        // Supply the request with the memory size, min block size, and max block size
        // The API should return the initial memory state
        // Set the memory states to the initial memory state
        // Save the initial memory state for reference
        // Catch errors, log them to console
        console.log('Initializing Memory');
    }

    const handleProcessCreation = () => {
        // Try to send a POST request to the API
        // Supply the request with the request percentage, min request size, and max request size
        // The API should return a dictionary with the process pool
        // Set the process pool to the returned process pool
        // Catch errors, log them to console
    }

    const handleProcessSelection = () => {
        // Do nothing, we don't want to select a process in the benchmark
    }

    const dummyFunction = ()=> {}

    return (
        <>
        <Navbar />
        <div>
            <div className="flex flex-col max-w-6xl p-4 mx-auto">
                <div className="flex flex-row">
                    {/* First column, memory init and initial memory state */}
                    <div className="flex flex-col w-1/2 p-4">
                        <div className="flex flex-col space-y-4 mb-4">
                            <h2 className='text-lg font-bold'>Memory Initialization</h2>
                            <KBInput label='Memory Size' value={memorySize} onChange={setMemorySize} />
                            <KBInput label='Min Block Size' value={minBlockSize} onChange={setMinBlockSize} />
                            <KBInput label='Max Block Size' value={maxBlockSize} onChange={setMaxBlockSize} />
                            <button className='btn btn-primary rounded-lg' onClick={handleInitializeMemory}>Initialize Memory</button>
                        </div>
                        <div className="divider"></div>
                        {/* Initial memory state */}
                        <div className='flex flex-col space-y-4 mb-4'>
                            <h2 className='text-lg font-bold'>Initial Memory State</h2>
                            {initialMemoryState ? <MemoryState memory={initialMemoryState} handleBlockSelection={dummyFunction} /> : <p>Memory not yet initialized.</p>}
                            {initialMemoryState ? <MemoryStateTable memory={initialMemoryState} /> : null}
                        </div>
                    </div>
                    <div className="divider divider-horizontal p-2"></div>
                    {/* Second column, process init and pool */}
                    <div className="flex flex-col w-1/2 p-4">
                        <div className="flex flex-col space-y-4 mb-4">
                            <h2 className="text-lg font-bold">Process Initialization</h2>
                            <div className="flex flex-row w-full justify-between items-center">
                                <label htmlFor="requestPercentage">Memory request %: </label>
                                <div className="flex flex-row items-center">
                                    <input className="input input-bordered" type="number" id="requestPercentage" value={requestPercentage} onChange={(e) => setRequestPercentage((parseInt(e.target.value)))} />
                                    <span className="ml-2">%</span>
                                </div>
                            </div>
                            <KBInput label="Min Request Size" value={minBlockSize} onChange={setMinBlockSize} />
                            <KBInput label="Max Request Size" value={maxBlockSize} onChange={setMaxBlockSize} />
                            <button className="btn btn-primary rounded-lg" onClick={handleProcessCreation}>Initialize Process Pool</button>
                        </div>
                        <div className="divider"></div>
                        <div className="flex flex-col space-y-4 mb-4">
                            <h2 className='text-lg font-bold'>Process Pool</h2>
                            <ProcessPoolTable processes={processPool} handleProcessSelection={handleProcessSelection} />
                        </div>      
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Benchmark;