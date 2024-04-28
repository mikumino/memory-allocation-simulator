import { useState } from 'react';
import axios from 'axios';

function App() {
    const [memorySize, setMemorySize] = useState(1000);
    const [numProcesses, setNumProcesses] = useState(1);
    const [minProcessSize, setMinProcessSize] = useState(100);
    const [maxProcessSize, setMaxProcessSize] = useState(300);
    const [minBlockSize, setMinBlockSize] = useState(1);
    const [maxBlockSize, setMaxBlockSize] = useState(500);
    const [algorithm, setAlgorithm] = useState('first_fit');
    const [simulationResults, setSimulationResults] = useState(null);
    const [error, setError] = useState(null);

    const handleSimulate = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/simulate', {
                memory_size: memorySize,
                num_processes: numProcesses,
                min_process_size: minProcessSize,
                max_process_size: maxProcessSize,
                min_block_size: minBlockSize,
                max_block_size: maxBlockSize,
                algorithm,
            });
            setSimulationResults(response.data);
            setError(null);
        } catch (error) {
            console.error('Error during simulation:', error);
            setError('An error occurred during simulation. Please try again.');
        }
    };

    return (
        <div className="flex flex-col max-w-xl mx-auto mt-16">
            <h1 className="text-2xl font-bold mb-8">Memory Allocation Simulation</h1>
            <div className='flex flex-col mb-6 space-y-4'>
                <div className='flex flex-row justify-between items-center space-x-6'>
                    <label htmlFor='memorySize'>Memory Size</label>
                    <input className='p-2 rounded-lg' id='memorySize' type='number' value={memorySize} onChange={(e) => setMemorySize(parseInt(e.target.value))} />
                </div>
                <div className='flex flex-row justify-between items-center space-x-6'>
                    <label htmlFor='numProcesses'>Number of Processes</label>
                    <input className='p-2 rounded-lg' id='numProcesses' type='number' value={numProcesses} onChange={(e) => setNumProcesses(parseInt(e.target.value))} />
                </div>
                <div className='flex flex-row justify-between items-center space-x-6'>
                    <label htmlFor='minSize'>Minimum Process Size</label>
                    <input className='p-2 rounded-lg' id='minSize' type='number' value={minProcessSize} onChange={(e) => setMinProcessSize(parseInt(e.target.value))} />
                </div>
                <div className='flex flex-row justify-between items-center space-x-6'>
                    <label htmlFor='maxSize'>Maximum Process Size</label>
                    <input className='p-2 rounded-lg' id='maxSize' type='number' value={maxProcessSize} onChange={(e) => setMaxProcessSize(parseInt(e.target.value))} />
                </div>
                <div className='flex flex-row justify-between items-center space-x-6'>
                    <label htmlFor='minSize'>Minimum Block Size</label>
                    <input className='p-2 rounded-lg' id='minSize' type='number' value={minBlockSize} onChange={(e) => setMinBlockSize(parseInt(e.target.value))} />
                </div>
                <div className='flex flex-row justify-between items-center space-x-6'>
                    <label htmlFor='minSize'>Maximum Block Size</label>
                    <input className='p-2 rounded-lg' id='minSize' type='number' value={maxBlockSize} onChange={(e) => setMaxBlockSize(parseInt(e.target.value))} />
                </div>
                <div className='flex flex-row justify-between items-center space-x-6'>
                    <label htmlFor='algorithm'>Algorithm</label>
                    <select className='py-2 px-4 rounded-lg' id='algorithm' value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
                        <option value='first_fit'>First Fit</option>
                    </select>
                </div>
            </div>

            <button className='py-2 px-6 mb-6 w-fit border rounded-md hover:border-teal-200 hover:text-teal-200 transition-colors' onClick={handleSimulate}>Simulate</button>
            {error && <p className="text-red-500">{error}</p>}
            {simulationResults && (
            <div className='flex flex-col'>
                <h2 className='text-lg font-bold'>Simulation Results</h2>
                <pre>{JSON.stringify(simulationResults, null, 2)}</pre>
            </div>
            )}
        </div>
    );
}

export default App;
