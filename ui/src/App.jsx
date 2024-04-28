import { useState } from 'react';
import KBInput from './components/KBInput';
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

    const handleInitializeMemory = async () => {
        // TODO: Implement this function
        console.log('Memory initialized');
    };

    return (
        <div className='flex flex-row mx-auto'>
            {/* First column, memory initialization, memory state, process freeing */}
            <div className='flex flex-col w-1/2 p-4'>
                {/* Memory Initialization */}
                <div className='flex flex-col space-y-4 mb-4'>
                    <h2 className='text-lg font-bold'>Memory Initialization</h2>
                    <KBInput label='Memory Size' value={memorySize} onChange={setMemorySize} />
                    <KBInput label='Min Block Size' value={minBlockSize} onChange={setMinBlockSize} />
                    <KBInput label='Max Block Size' value={maxBlockSize} onChange={setMaxBlockSize} />
                    <button className='btn btn-outline rounded-lg' onClick={handleInitializeMemory}>Initialize Memory</button>
                </div>
                {/* Memory State */}
                <div className='divider'></div>
                <div className='flex flex-col space-y-4 mb-4'>
                    <h2 className='text-lg font-bold'>Memory State</h2>
                    {/* Memory state visualization */}
                </div>
            </div>
        </div>
    );
}

export default App;
