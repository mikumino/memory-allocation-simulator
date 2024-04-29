import PropTypes from 'prop-types';

const MemoryBlock = ({ block }) => {
    const width_percent = `${parseInt((block.size / block.memory_size) * 100)}%`;
    const color = block.process ? "bg-amber-300" : "bg-blue-300";
    return (
        <div className='tooltip w-full' data-tip={`Size: ${block.size} KB\n${block.process ? `Process: ${block.process.id}` : ''}`}>
            <div className={`h-16 ${color} rounded-md`} style={{width: width_percent}}></div>
        </div>
    )
}

MemoryBlock.propTypes = {
    block: PropTypes.object.isRequired,
}

export default MemoryBlock;