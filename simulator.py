import random

class Memory:
    def __init__(self, size):
        self.size = size
        self.blocks = []

    def add_block(self, size):
        self.blocks.append(MemoryBlock(size))

    def insert_block(self, index, size, allocated):
        self.blocks.insert(index, MemoryBlock(size, allocated))

    # Sum of unallocated blocks
    def get_available_space(self):
        return sum([block.size for block in self.blocks if not block.allocated])
    
    def copy(self):
        memory = Memory(self.size)
        memory.blocks = [block.copy() for block in self.blocks]
        return memory

# A memory block, what Memory class will be made of
class MemoryBlock:
    def __init__(self, size, allocated=False):
        self.size = size
        self.allocated = allocated
    
    def copy(self):
        return MemoryBlock(self.size, self.allocated)


class Process:
    def __init__(self, id, size):
        self.id = id
        self.size = size

# Function to generate random process sizes
def generate_processes(num_processes, min_size, max_size):
    processes = []
    for num in range(num_processes):
        processes.append(Process(num, random.randint(min_size, max_size)))
    return processes

# Given a Memory, randomly allocate blocks
def random_memory_state(memory, min_block_size, max_block_size):
    # While there is still space in the memory, add blocks
    while sum([block.size for block in memory.blocks]) < memory.size:
        # Add either a random block size or the remaining space in the memory
        memory.add_block(min(random.randint(min_block_size, max_block_size), memory.size - sum([block.size for block in memory.blocks])))
    # randomly allocate blocks
    for block in memory.blocks:
        block.allocated = random.choice([True, False])
    

# Attempts to allocate by looking for the first block that fits the process
def first_fit(memory, process):
    for block in memory.blocks:
        # if block size is the same as process size and is free, turn the block to allocated
        if block.size == process.size and not block.allocated:
            block.allocated = True
            return True
        # if block size is greater than process size and is free, split the block into an allocated and unallocated block
        elif block.size > process.size and not block.allocated:
            print([block.__dict__ for block in memory.blocks])
            memory.insert_block(memory.blocks.index(block), process.size, True)
            print(block.size, process.size)
            block.size -= process.size  # remaining block size
            print(block.size, process.size)
            return True
    return False

# TODO: Implement next fit algorithm
# Next fit is an optimization of first fit. It starts searching from the last block that was allocated, so we need to keep track of the last block that was allocated
def next_fit(memory, process):
    return None

# TODO: Implement best fit algorithm
# Searches for the smallest block that fits the process
def best_fit(memory, process):
   return None

# TODO: Implement worst fit algorithm
# Searches for the largest block that fits the process
def worst_fit(memory, process):
   return None

# Simulate allocation for a given algorithm
def simulate(memory_size, processes, algorithm, min_block_size=1, max_block_size=10):
    memory = Memory(memory_size)
    random_memory_state(memory, min_block_size, max_block_size)
    old_memory = memory.copy()
    print([block.__dict__ for block in old_memory.blocks])
    
    for process in processes:
        algorithm(memory, process)
    
    return {
        "previous_memory": [block.__dict__ for block in old_memory.blocks],
        "memory": [block.__dict__ for block in memory.blocks],
        "available_space": memory.get_available_space(),
        "unallocated_processes": [process.__dict__ for process in processes if not any([block.size == process.size and block.allocated for block in memory.blocks])]
    }



