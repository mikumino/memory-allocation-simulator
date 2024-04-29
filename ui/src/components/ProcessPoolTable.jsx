import PropTypes from 'prop-types';

const ProcessPoolTable = ({ processes }) => {
    return (
        <div className='overflow-y-auto max-h-64 w-full'>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Memory Requirement (KB)</th>
                    </tr>
                </thead>
                <tbody>
                    {processes.length === 0 && 
                        <tr>
                            <td colSpan='2'>No processes in pool</td>
                    </tr>}
                    {processes.map((process, i) => (
                        <tr key={i}>
                            <td>{process.id}</td>
                            <td>{process.size}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

ProcessPoolTable.propTypes = {
    processes: PropTypes.array.isRequired,
}

export default ProcessPoolTable;