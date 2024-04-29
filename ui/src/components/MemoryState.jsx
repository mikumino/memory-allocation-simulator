import PropTypes from 'prop-types';
import MemoryBlock from './MemoryBlock';

const MemoryState = ({ memory }) => {
    let blocks = [];
    for (let i = 0; i < memory.memory.blocks.length; i++) {
        // TODO: Extract this into a separate component with info about the block
        blocks.push(
            <MemoryBlock block={memory.memory.blocks[i]} key={i} />
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
}

export default MemoryState;