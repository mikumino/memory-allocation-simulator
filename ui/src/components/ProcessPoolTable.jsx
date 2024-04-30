import PropTypes from 'prop-types';
import ProcessRow from './ProcessRow';

const ProcessPoolTable = ({ processes, handleProcessSelection }) => {
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
                        <ProcessRow key={i} process={process} handleProcessSelection={handleProcessSelection}  />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

ProcessPoolTable.propTypes = {
    processes: PropTypes.array.isRequired,
    handleProcessSelection: PropTypes.func.isRequired
}

export default ProcessPoolTable;