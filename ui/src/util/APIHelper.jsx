import axios from "axios";

const API_URL = "http://127.0.0.1:5000";

// quick fetcher for pre-defined URL
async function fetcher (route, options, type='POST') {
    if (type == 'POST') {
        const response = await axios.post(
            API_URL+route,
            options
        );
        return response.data;
    } else if (type == 'DELETE') {
        const response = await axios.delete(
            API_URL+route,
            {
                data: options
            }
        );
        return response.data;
    }
}

// Initialize memory
export async function initializeMemory(memorySize, minBlockSize, maxBlockSize) {
    return fetcher('/init_memory', {
        memory_size: memorySize,
        min_block_size: minBlockSize,
        max_block_size: maxBlockSize
    });
}

// Create process
export async function createProcess(memory, memory_requirement) {
    return fetcher('/processes', {
        memory: memory,
        memory_requirement: memory_requirement
    });
}

// Create random processes
export async function createRandomProcesses(memory, min_process_size, max_process_size, memory_requirement=-1, num_processes=1) {
    return fetcher('/processes', {
        memory: memory,
        min_process_size: min_process_size,
        max_process_size: max_process_size,
        memory_requirement: memory_requirement,
        num_processes: num_processes
    });
}

// Free process
export async function freeProcess(memory, selectedBlock) {
    return fetcher('/processes', {
        memory: memory,
        selectedBlock: selectedBlock
    }, 'DELETE');
}

// Free random process
export async function freeRandomProcess(memory) {
    return fetcher('/processes/random', {
        memory: memory,
    }, 'DELETE');
}

// Free all processes
export async function freeAllProcesses(memory) {
    return fetcher('/processes/all', {
        memory: memory
    }, 'DELETE');
}

// Allocate memory to single process
export async function allocate(memory, process, algorithm) {
    return fetcher('/allocate', {
        memory: memory,
        process: process,
        algorithm: algorithm
    });
}

// Allocate memory to all processes
export async function allocateAll(memory, process_pool, algorithm) {
    return fetcher('/allocate/all', {
        memory: memory,
        process_pool: process_pool,
        algorithm: algorithm
    });
}