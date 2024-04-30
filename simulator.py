import random

class Memory:
    def __init__(self, size, blocks=[]):
        self.size = size
        self.blocks = blocks

    def add_block(self, size):
        self.blocks.append(MemoryBlock(size))

    def insert_block(self, index, memory_block):
        self.blocks.insert(index, memory_block)

    # Sum of unallocated blocks
    def get_available_space(self):
        return sum([block.size for block in self.blocks if not block.allocated])
    def copy(self):
        memory = Memory(self.size)
        memory.blocks = [block.copy() for block in self.blocks]
        return memory
    def to_dict(self):
        return {
            "size": self.size,
            "blocks": [block.to_dict() for block in self.blocks]
        }

# A memory block, what Memory class will be made of
class MemoryBlock:
    def __init__(self, size, allocated=False, process=None):
        self.size = size
        self.allocated = allocated
        self.process = process
    def copy(self):
        return MemoryBlock(self.size, self.allocated, self.process)
    def to_dict(self):
        return {
            "size": self.size,
            "allocated": self.allocated,
            "process": self.process.to_dict() if self.process else None
        }

class Process:
    def __init__(self, id, size):
        self.id = id
        self.size = size
    def to_dict(self):
        return {
            "id": self.id,
            "size": self.size
        }

def dict_to_blocks(blocks_dict):
    blocks = []
    for block in blocks_dict:
        blocks.append(MemoryBlock(block['size'], block['allocated'], Process(block['process']['id'], block['process']['size']) if block['process'] else None))
    return blocks

def generate_process_id(memory):
    process_id = random.randint(0, 999)
    for block in memory.blocks:
        if block.process and block.process.id == process_id:
            process_id = random.randint(0, 999)
    return process_id

# Generate a random process given min/max sizes for memory
def generate_process(memory, min_size, max_size):
    return Process(generate_process_id(memory), random.randint(min_size, max_size))

# Merge unallocated blocks
def merge_unallocated(memory):
    i = 0
    while (i < len(memory.blocks)):
        # if the last block is unallocated and this block is also unallocated, merge them
        if i > 0 and not memory.blocks[i-1].allocated and not memory.blocks[i].allocated:
            memory.blocks[i-1].size += memory.blocks[i].size
            memory.blocks.pop(i)
            i -= 1
        i += 1

# Given a Memory, randomly create blocks, allocate them, and merge unallocated blocks
def random_memory_state(memory, min_block_size, max_block_size):
    memory.blocks = []
    # While there is still space in the memory, add blocks
    while sum([block.size for block in memory.blocks]) < memory.size:
        # Add either a random block size or the remaining space in the memory
        memory.add_block(min(random.randint(min_block_size, max_block_size), memory.size - sum([block.size for block in memory.blocks])))
    # randomly allocate blocks
    i = 0
    while (i < len(memory.blocks)):
        memory.blocks[i].allocated = random.choice([True, False])
        # if the block is allocated, generate a process and attach it to the block
        if memory.blocks[i].allocated:
            memory.blocks[i].process = Process(generate_process_id(memory), memory.blocks[i].size)
        # if the last block is unallocated and this block is also unallocated, merge them
        elif i > 0 and not memory.blocks[i-1].allocated and not memory.blocks[i].allocated:
            memory.blocks[i-1].size += memory.blocks[i].size
            memory.blocks.pop(i)
            i -= 1
        i += 1

    

# Attempts to allocate by looking for the first block that fits the process
def first_fit(memory, process):
    for block in memory.blocks:
        # if block size is the same as process size and is free, turn the block to allocated
        if block.size == process.size and not block.allocated:
            block.allocated = True
            block.process = process
            return True
        # if block size is greater than process size and is free, split the block into an allocated and unallocated block
        elif block.size > process.size and not block.allocated:
            memory.insert_block(memory.blocks.index(block), MemoryBlock(process.size, True, process))
            block.size -= process.size  # remaining block size
            return True
    return False

# TODO: Implement next fit algorithm
# Next fit is an optimization of first fit. It starts searching from the last block that was allocated, so we need to keep track of the last block that was allocated
def next_fit(memory, process):
    return None

# TODO: Implement best fit algorithm
# Searches for the smallest block that fits the process
def best_fit(memory, process):
    best_index = -1
    best_size = float('inf')
    #Traverse through all the blocks
    for i, block in enumerate(memory.blocks):
        #If block isn't allocated and it's size is greater than process size
        if not block.allocated and block.size >= process.size:
            #Ideal condition, block size is the same as process size then allocate
            if block.size == process.size:
                memory.blocks[i].allocated = True
                memory.blocks[i].process = process
                return True
            #Iterate through the blocks and keep updating until we find the smallest block size that will fit
            elif block.size < best_size:
                best_index = i
                best_size = block.size
    if best_index != -1:
        # Split the best-fit block into an allocated block for the process and an unallocated block
        memory.insert_block(best_index, MemoryBlock(process.size, True, process))
        memory.blocks[best_index + 1].size -= process.size
        return True
    return False


# TODO: Implement worst fit algorithm
# Searches for the largest block that fits the process
def worst_fit(memory, process):
    # for every block in memory, find the largest block that fits the process
    # if no block fits,
   return None

