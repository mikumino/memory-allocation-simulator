import PropTypes from 'prop-types';

const MemoryState = ({ memory }) => {
    console.log(memory.memory);
    let blocks = [];
    for (let i = 0; i < memory.memory.blocks.length; i++) {
        // console.log(memory.memory.blocks[i].size)
        const width_percent = `${parseInt((memory.memory.blocks[i].size / memory.memory.size) * 100)}%`;
        const color = memory.memory.blocks[i].process ? "bg-amber-300" : "bg-blue-300";
        blocks.push(
            <div key={i} className={`h-16 ${color} rounded-md`} style={{width: width_percent}}></div>
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