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
        <div className='flex flex-row max-w-4xl mx-auto'>
            {/* First column, memory initialization, memory state, process freeing */}
            <div className='flex flex-col w-1/3 p-4'>
                <div className='flex flex-col mb-4'>
                    <h2 className='text-lg font-bold'>Memory Initialization</h2>

                </div>
            </div>
        </div>
    );
}

export default App;
