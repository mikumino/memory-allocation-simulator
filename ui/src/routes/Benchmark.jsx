import { useState } from "react";
import Navbar from "../components/Navbar";
import KBInput from "../components/KBInput";
import MemoryState from "../components/MemoryState";
import MemoryStateTable from "../components/MemoryStateTable";
import ProcessPoolTable from "../components/ProcessPoolTable";
import AlgorithmStats from "../components/AlgorithmStats";
import { 
    initializeMemory,
    createRandomProcesses,
    allocateAll,
} from '../util/APIHelper';

function Benchmark() {
    // React useStates
    // Memory initialization
    const [memorySize, setMemorySize] = useState(1024);
    const [minBlockSize, setMinBlockSize] = useState(8);
    const [maxBlockSize, setMaxBlockSize] = useState(128);
    // Memory states
    const [firstFitMemoryState, setfirstFitMemoryState] = useState(null);
    const [nextFitMemoryState, setNextFitMemoryState] = useState(null);
    const [bestFitMemoryState, setBestFitMemoryState] = useState(null);
    const [worstFitMemoryState, setWorstFitMemoryState] = useState(null);
    // Algorithm stats
    const [firstFitStats, setFirstFitStats] = useState(null);
    const [nextFitStats, setNextFitStats] = useState(null);
    const [bestFitStats, setBestFitStats] = useState(null);
    const [worstFitStats, setWorstFitStats] = useState(null);
    // Initial memory state
    const [initialMemoryState, setInitialMemoryState] = useState(null);
    // Process initialization
    const [requestPercentage, setRequestPercentage] = useState(85);
    const [minRequestSize, setMinRequestSize] = useState(64);
    const [maxRequestSize, setMaxRequestSize] = useState(128);
    // Process pool
    const [processPool, setProcessPool] = useState([]);

    // Event Handlers
    const handleInitializeMemory = async () => {
        // Try to send a POST request to the API
        // Supply the request with the memory size, min block size, and max block size
        try {
            const response = await initializeMemory(memorySize, minBlockSize, maxBlockSize);
            setInitialMemoryState(response);
            setfirstFitMemoryState(response);
            setNextFitMemoryState(response);
            setBestFitMemoryState(response);
            setWorstFitMemoryState(response);
            setProcessPool([]);
        } catch (error) {
            console.error(error);
        }
    }

    const handleProcessCreation = async () => {
        // Try to send a POST request to the API
        try {
            const response = await createRandomProcesses(initialMemoryState, minRequestSize, maxRequestSize, requestPercentage);
            console.log(response);
            setProcessPool(response.process_pool);
        } catch (error) {
            console.error(error);
        }
    }

    const runSingleTest = async () => {
        // Try to send a POST request to the API
        try {
            const firstFitResponse = await allocateAll(firstFitMemoryState, processPool, 'first_fit');
            setfirstFitMemoryState(firstFitResponse);
            setFirstFitStats(firstFitResponse.stats);
            const nextFitResponse = await allocateAll(nextFitMemoryState, processPool, 'next_fit');
            setNextFitMemoryState(nextFitResponse);
            setNextFitStats(nextFitResponse.stats);
            const bestFitResponse = await allocateAll(bestFitMemoryState, processPool, 'best_fit');
            setBestFitMemoryState(bestFitResponse);
            setBestFitStats(bestFitResponse.stats);
            const worstFitResponse = await allocateAll(worstFitMemoryState, processPool, 'worst_fit');
            setWorstFitMemoryState(worstFitResponse);
            setWorstFitStats(worstFitResponse.stats);
        } catch (error) {
            console.error(error);
        }
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
                            <KBInput label="Min Request Size" value={minRequestSize} onChange={setMinRequestSize} />
                            <KBInput label="Max Request Size" value={maxRequestSize} onChange={setMaxRequestSize} />
                            <button className="btn btn-primary rounded-lg" onClick={handleProcessCreation}>Initialize Process Pool</button>
                        </div>
                        <div className="divider"></div>
                        <div className="flex flex-col space-y-4 mb-4">
                            <h2 className='text-lg font-bold'>Process Pool</h2>
                            <ProcessPoolTable processes={processPool} handleProcessSelection={handleProcessSelection} />
                        </div>      
                    </div>
                </div>
                <div className="divider"></div>
                <h1 className="text-2xl font-bold mb-4">Single Test</h1>
                {/* Grid with all algorithms, their memory states, tables */}
                <div className="grid grid-cols-2 p-4 gap-4">
                    {/* First Fit */}
                    <div className="flex flex-col space-y-4">
                        <h2 className="text-lg font-bold">First Fit</h2>
                        {firstFitMemoryState ? <MemoryState memory={firstFitMemoryState} handleBlockSelection={dummyFunction} /> : <p>Memory not yet initialized.</p>}
                        {firstFitMemoryState ? <MemoryStateTable memory={firstFitMemoryState} /> : null}
                        {firstFitMemoryState ? <AlgorithmStats algorithm='First Fit' stats={firstFitStats} /> : null}
                    </div>
                    {/* Next Fit */}
                    <div className="flex flex-col space-y-4">
                        <h2 className="text-lg font-bold">Next Fit</h2>
                        {nextFitMemoryState ? <MemoryState memory={nextFitMemoryState} handleBlockSelection={dummyFunction} /> : <p>Memory not yet initialized.</p>}
                        {nextFitMemoryState ? <MemoryStateTable memory={nextFitMemoryState} /> : null}
                        {nextFitMemoryState ? <AlgorithmStats algorithm='Next Fit' stats={nextFitStats} /> : null}
                    </div>
                    {/* Best Fit */}
                    <div className="flex flex-col space-y-4">
                        <h2 className="text-lg font-bold">Best Fit</h2>
                        {bestFitMemoryState ? <MemoryState memory={bestFitMemoryState} handleBlockSelection={dummyFunction} /> : <p>Memory not yet initialized.</p>}
                        {bestFitMemoryState ? <MemoryStateTable memory={bestFitMemoryState} /> : null}
                        {bestFitMemoryState ? <AlgorithmStats algorithm='Best Fit' stats={bestFitStats} /> : null}
                    </div>
                    {/* Worst Fit */}
                    <div className="flex flex-col space-y-4">
                        <h2 className="text-lg font-bold">Worst Fit</h2>
                        {worstFitMemoryState ? <MemoryState memory={worstFitMemoryState} handleBlockSelection={dummyFunction} /> : <p>Memory not yet initialized.</p>}
                        {worstFitMemoryState ? <MemoryStateTable memory={worstFitMemoryState} /> : null}
                        {worstFitMemoryState ? <AlgorithmStats algorithm='Worst Fit' stats={worstFitStats} /> : null}
                    </div>
                </div>
                <button className="btn btn-primary w-fit rounded-lg mb-6" onClick={runSingleTest}>Run Test</button>
            </div>
        </div>
        </>
    );
}

export default Benchmark;