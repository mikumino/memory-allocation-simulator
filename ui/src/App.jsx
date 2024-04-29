import { useState } from 'react';
import KBInput from './components/KBInput';
import MemoryState from './components/MemoryState';
import MemoryStateTable from './components/MemoryStateTable';
import axios from 'axios';

function App() {
    const [memorySize, setMemorySize] = useState(1000);
    const [memoryRequirement, setMemoryRequirement] = useState(50);
    const [minProcessSize, setMinProcessSize] = useState(100);
    const [maxProcessSize, setMaxProcessSize] = useState(300);
    const [minBlockSize, setMinBlockSize] = useState(1);
    const [maxBlockSize, setMaxBlockSize] = useState(500);
    const [algorithm, setAlgorithm] = useState('first_fit');
    const [initialMemoryState, setInitialMemoryState] = useState(null);
    const [memoryState, setMemoryState] = useState(null);
    const [error, setError] = useState(null);

    const handleAllocate = async () => {
        // TODO: Implement this function
    }

    const handleInitializeMemory = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/init_memory', {
                memory_size: memorySize,
                min_block_size: minBlockSize,
                max_block_size: maxBlockSize,
            });
            setError(null);
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
            console.log(response.data);
        } catch (error) {
            console.error('Error during process creation:', error);
            setError('An error occurred during process creation. Please try again.');
        }
        console.log('Process created');
    }

    return (
        <div className='flex flex-col max-w-6xl p-4 mx-auto'>
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
                        {memoryState ? <MemoryState memory={initialMemoryState} /> : <p>Memory not yet initialized.</p>}
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
                        <button className='btn btn-outline btn-secondary rounded-lg' onClick={handleCreateProcess}>Create Random Process</button>
                    </div>
                    <div className='divider'></div>
                    {/* Process Pool and Sim Controls */}
                    <div className='flex flex-col space-y-4 mb-4'>
                        <h2 className='text-lg font-bold'>Process Pool</h2>
                        {/* Once again, placeholder */}
                        <div className='overflow-y-auto max-h-64 w-full'>
                            <table className='table '>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Memory Requirement</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>50 KB</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>100 KB</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>75 KB</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
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
            {/* Simulation Results */}
            <div className='flex flex-col w-full'>
                <h1 className='text-2xl font-bold mb-4'>Simulation</h1>
                {/* Placeholder memory state */}
                <div className='flex flex-row space-x-1 mb-4'>
                    <div className='h-16 w-8 rounded-md bg-amber-300'></div>
                    <div className='h-16 w-16 rounded-md bg-blue-300'></div>
                    <div className='h-16 w-32 rounded-md bg-amber-300'></div>
                    <div className='h-16 w-64 rounded-md bg-amber-300'></div>
                    <div className='h-16 flex-grow rounded-md bg-blue-300'></div>
                </div>
                <div className='flex flex-row'>
                    <button className='btn btn-outline btn-success rounded-lg mr-2'>Free Process</button>
                    <button className='btn btn-outline btn-info rounded-lg'>Free Random Process</button>
                    <button className='btn btn-outline btn-warning rounded-lg ml-2'>Free All Processes</button>
                </div>

            </div>
        </div>

    );
}

export default App;
