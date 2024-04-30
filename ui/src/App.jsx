import { useEffect, useState } from 'react';
import KBInput from './components/KBInput';
import MemoryState from './components/MemoryState';
import MemoryStateTable from './components/MemoryStateTable';
import ProcessPoolTable from './components/ProcessPoolTable';
import Toast from './components/Toast';
import axios from 'axios';

function App() {
    const [memorySize, setMemorySize] = useState(1024);
    const [memoryRequirement, setMemoryRequirement] = useState(64);
    const [minProcessSize, setMinProcessSize] = useState(8);
    const [maxProcessSize, setMaxProcessSize] = useState(256);
    const [minBlockSize, setMinBlockSize] = useState(8);
    const [maxBlockSize, setMaxBlockSize] = useState(512);
    const [algorithm, setAlgorithm] = useState('first_fit');
    const [initialMemoryState, setInitialMemoryState] = useState(null);
    const [memoryState, setMemoryState] = useState(null);
    const [processPool, setProcessPool] = useState([]);
    const [selectedProcess, setSelectedProcess] = useState(null);
    const [selectedBlock, setSelectedBlock] = useState(null);
    const [error, setError] = useState(null);
    const [toast, setToast] = useState({message:'', type:''});
    const [showToast, setShowToast] = useState(false);
    
    // single process allocation
    const handleAllocate = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/allocate', {
                memory: memoryState,
                process: selectedProcess,
                algorithm: algorithm,
            });
            setError(null);
            console.log(response.data);
            setMemoryState(response.data);
            setProcessPool(processPool.filter(process => process.id !== selectedProcess.id));
            setSelectedProcess(null);
        } catch (error) {
            console.error('Error during memory initialization:', error);
            setToast({message:`Failed to allocate Process ${selectedProcess.id}`, type:'error'})
            setShowToast(true);
        }
    }

    const handleInitializeMemory = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/init_memory', {
                memory_size: memorySize,
                min_block_size: minBlockSize,
                max_block_size: maxBlockSize,
            });
            setError(null);
            setProcessPool([]);
            setSelectedProcess(null);
            setSelectedBlock(null);
            setMemoryState(response.data);
            setInitialMemoryState(response.data);
        } catch (error) {
            console.error('Error during memory initialization:', error);
            setError('An error occurred during memory initialization. Please try again.');
        }
        console.log('Memory initialized');
    };

    const handleCreateProcess = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/processes', {
                memory: memoryState,
                memory_requirement: memoryRequirement,
            });
            setError(null);
            processPool.push(response.data.process);
            setProcessPool([...processPool]);
            console.log(processPool);
            console.log('Process created');
        } catch (error) {
            console.error('Error during process creation:', error);
            setError('An error occurred during process creation. Please try again.');
        }
    }

    const handleCreateRandomProcess = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/processes', {
                memory: memoryState,
                min_process_size: minProcessSize,
                max_process_size: maxProcessSize,
            });
            setError(null);
            processPool.push(response.data.process);
            setProcessPool([...processPool]);
        } catch (error) {
            console.error('Error during random process creation:', error);
            setError('An error occurred during random process creation. Please try again.');
        }   
    }

    const handleProcessSelection = (process) => {
        setSelectedProcess(process);
        console.log('Process selected:', process);
    };

    const handleBlockSelection = (block) => {
        setSelectedBlock(block);
        console.log('Block selected:', block);
    }

    const handleFreeProcess = async () => {
        try {
            const response = await axios.delete('http://127.0.0.1:5000/processes', {
                data: {
                    memory: memoryState,
                    selectedBlock: selectedBlock,
                }
            });
            setError(null);
            setMemoryState(response.data);
        } catch (error) {
            console.error('Error during process freeing:', error);
            setError('An error occurred during process freeing. Please try again.');
        }
    }

    const handleFreeAllProcesses = async () => {
        try {
            const response = await axios.delete('http://127.0.0.1:5000/processes/all', {
                data: {
                    memory: memoryState,
                }
            });
            setError(null);
            setMemoryState(response.data);
        } catch (error) {
            console.error('Error during process freeing:', error);
            setError('An error occurred during process freeing. Please try again.');
        }
    }

    // probably a dumb way to do this but it works LOL
    const dummyFunction = ()=> {
        
    }

    return (
        <div className='flex flex-col max-w-6xl p-4 mx-auto'>
            {showToast ? <Toast message={toast.message} type={toast.type}  setShow={setShowToast}/> : null}
            {error ? <div className='alert alert-error'>{error}</div> : null}
            <div className='flex flex-row'>
                {/* First column, memory initialization, memory state, process freeing */}
                <div className='flex flex-col w-1/2 p-4'>
                    {/* Memory Initialization */}
                    <div className='flex flex-col space-y-4 mb-4'>
                        <h2 className='text-lg font-bold'>Memory Initialization</h2>
                        <KBInput label='Memory Size' value={memorySize} onChange={setMemorySize} />
                        <KBInput label='Min Block Size' value={minBlockSize} onChange={setMinBlockSize} />
                        <KBInput label='Max Block Size' value={maxBlockSize} onChange={setMaxBlockSize} />
                        <button className='btn btn-primary rounded-lg' onClick={handleInitializeMemory}>Initialize Memory</button>
                    </div>
                    {/* Initial Memory State */}
                    <div className='divider'></div>
                    <div className='flex flex-col space-y-4 mb-4'>
                        <h2 className='text-lg font-bold'>Initial Memory State</h2>
                        {memoryState ? <MemoryState memory={initialMemoryState} handleBlockSelection={dummyFunction} /> : <p>Memory not yet initialized.</p>}
                        {memoryState ? <MemoryStateTable memory={initialMemoryState} /> : null}
                    </div>
                </div>
                {/* Second column, process creation, pool*/}
                <div className='divider divider-horizontal p-2'></div>
                <div className='flex flex-col w-1/2 p-4'>
                    {/* Process Creation */}
                    <div className='flex flex-col space-y-4 mb-4'>
                        <h2 className='text-lg font-bold'>Process Creation</h2>
                        <KBInput label='Memory Requirement' value={memoryRequirement} onChange={setMemoryRequirement} />
                        <button className='btn btn-outline btn-secondary rounded-lg' onClick={handleCreateProcess}>Create Process</button>
                    </div>
                    <div className='divider'></div>
                    {/* Random Process Creation */}
                    <div className='flex flex-col space-y-4 mb-4'>
                        <h2 className='text-lg font-bold'>Random Process Creation</h2>
                        <KBInput label='Min Process Size' value={minProcessSize} onChange={setMinProcessSize} />
                        <KBInput label='Max Process Size' value={maxProcessSize} onChange={setMaxProcessSize} />
                        <button className='btn btn-outline btn-secondary rounded-lg' onClick={handleCreateRandomProcess}>Create Random Process</button>
                    </div>
                    <div className='divider'></div>
                    {/* Process Pool and Sim Controls */}
                    <div className='flex flex-col space-y-4 mb-4'>
                        <h2 className='text-lg font-bold'>Process Pool</h2>
                        <ProcessPoolTable processes={processPool} handleProcessSelection={handleProcessSelection} />
                        <p>Selected process: {selectedProcess ? selectedProcess.id : 'No process selected'}</p>
                        <div className='flex flex-row w-full justify-between items-center'>
                            <label htmlFor='algorithm'>Algorithm:</label>
                            <select className='select select-bordered px-16' id='algorithm' value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
                                <option value='first_fit'>First Fit</option>
                                <option value='best_fit'>Best Fit</option>
                                <option value='worst_fit'>Worst Fit</option>
                            </select>
                        </div>
                        <div className='flex flex-row flex-grow w-full gap-2 items-center'>
                            <button className='btn btn-primary rounded-lg flex-grow' onClick={handleAllocate}>Allocate</button>
                            <button className='btn btn-outline btn-danger rounded-lg flex-grow'>Allocate All</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='divider'></div>
            {/* Simulation */}
            <div className='flex flex-col w-full'>
                <h1 className='text-2xl font-bold mb-4'>Simulation</h1>
                {memoryState ? <MemoryState memory={memoryState} handleBlockSelection={handleBlockSelection}/> : <p>Memory not yet initialized.</p>}
                {memoryState ? <MemoryStateTable memory={memoryState} /> : null}
                <p className='mb-4'>Selected block: { selectedBlock || selectedBlock === 0 ? selectedBlock : 'No block selected'}</p>
                <div className='flex flex-row'>
                    <button className='btn btn-outline btn-success rounded-lg mr-2' onClick={handleFreeProcess}>Free Process</button>
                    <button className='btn btn-outline btn-info rounded-lg' >Free Random Process</button>
                    <button className='btn btn-outline btn-warning rounded-lg ml-2' onClick={handleFreeAllProcesses}>Free All Processes</button>
                </div>

            </div>
        </div>

    );
}

export default App;