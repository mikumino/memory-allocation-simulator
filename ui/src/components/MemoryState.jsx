import PropTypes from 'prop-types';
import MemoryBlock from './MemoryBlock';


const MemoryState = ({ memory, handleBlockSelection }) => {
    return (
        <div className="flex flex-row w-full space-x-1 mb-4">
            {memory.memory.blocks.map((block, i) => (
                <MemoryBlock block={block} memory_size={memory.memory.size} handleBlockSelection={handleBlockSelection} index={i} key={i} />
            ))}
        </div>
    )
}

MemoryState.propTypes = {
    memory: PropTypes.object.isRequired,
    handleBlockSelection: PropTypes.func.isRequired
}

export default MemoryState;