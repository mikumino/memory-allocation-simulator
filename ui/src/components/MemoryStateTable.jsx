import PropTypes from 'prop-types';

const MemoryStateTable = ({ memory }) => {
    return (
        <div className='overflow-y-auto max-h-64 w-full mb-6'>
        <table className='table table-pin-rows'>
            <thead>
                <tr>
                    <th>Block</th>
                    <th>Size</th>
                    <th>Allocated</th>
                </tr>
            </thead>
            <tbody>
                {memory.memory.blocks.map((block, i) => (
                    <tr key={i}>
                        <td>{i}</td>
                        <td>{block.size} KB</td>
                        <td>{block.process ? 'Yes' : 'No'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    )

}

MemoryStateTable.propTypes = {
    memory: PropTypes.object.isRequired,
}

export default MemoryStateTable;