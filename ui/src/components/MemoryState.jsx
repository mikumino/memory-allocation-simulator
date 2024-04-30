import PropTypes from 'prop-types';
import MemoryBlock from './MemoryBlock';

const MemoryState = ({ memory, handleBlockSelection }) => {
    let blocks = [];
    for (let i = 0; i < memory.memory.blocks.length; i++) {
        // TODO: Extract this into a separate component with info about the block
        blocks.push(
            <MemoryBlock block={memory.memory.blocks[i]} memory_size={memory.memory.size} handleBlockSelection={handleBlockSelection} index={i} key={i} />
        );
    }
    return (
        <div className="flex flex-row w-full space-x-1 mb-4">
            {blocks}
        </div>
    )
}

MemoryState.propTypes = {
    memory: PropTypes.object.isRequired,
    handleBlockSelection: PropTypes.func.isRequired
}

export default MemoryState;