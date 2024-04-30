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
    // Memory state
    const [memoryState, setMemoryState] = useState(false);
    const [initialMemoryState, setInitialMemoryState] = useState([]);
    // Process initialization
    const [requestPercentage, setRequestPercentage] = useState(50);
    // Process pool
    const [processPool, setProcessPool] = useState([]);

    // Event Handlers
    const handleInitializeMemory = () => {
        // Should be the same as the one in the Simulator
        console.log('Initializing Memory');
    }

    const handleProcessSelection = () => {}

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
                            {memoryState ? <MemoryState memory={initialMemoryState} handleBlockSelection={dummyFunction} /> : <p>Memory not yet initialized.</p>}
                            {memoryState ? <MemoryStateTable memory={initialMemoryState} /> : null}
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
                            <button className="btn btn-primary rounded-lg">Initialize Process Pool</button>
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