import PropTypes from 'prop-types';

const MemoryBlock = ({ block, memory_size, handleBlockSelection }) => {
    console.log();
    const width_percent = `${parseInt((block.size / memory_size) * 100)}%`;
    const color = block.process ? "bg-amber-300" : "bg-blue-300";
    return (
        <div className={`tooltip`} data-tip={`Size: ${block.size} KB\n${block.process ? `Process: ${block.process.id}` : ''}`} style={{ width: width_percent }}>
            <div className={`h-16 w-full ${color} rounded-md`} onClick={() => handleBlockSelection(block)}></div>
        </div>
    )
}

MemoryBlock.propTypes = {
    block: PropTypes.object.isRequired,
    memory_size: PropTypes.number.isRequired,
}

export default MemoryBlock;