import PropTypes from 'prop-types';

function AlgorithmStats ({ algorithm, stats=null }) {
    return (
        <div className='overflow-y-auto max-h-64 w-full mb-6'>
        <h2>{algorithm} Stats</h2>
        <table className='table table-pin-rows'>
            <thead>
                <tr>
                    <th>Stat</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                <tr key={0}>
                    <td>Total Processes</td>
                    <td>{stats ? stats.total_processes : 0}</td>
                </tr>
                <tr key={1}>
                    <td>Processes Allocated</td>
                    <td>{stats ? stats.allocated_processes : 0}</td>
                </tr>
                <tr key={2}>
                    <td>Processes Not Allocated</td>
                    <td>{stats ? stats.unallocated_processes.length : 0}</td>
                </tr>
                <tr key={3}>
                    <td>Available Memory</td>
                    <td>{stats ? stats.available_space : 0} KB</td>
                </tr>
                <tr key={4}>
                    <td>Fragmentation</td>
                    <td>{stats ? stats.fragmentation : 0}</td>
                </tr>
                <tr key={5}>
                    <td>Memory Utilization</td>
                    <td>{stats ? stats.memory_utilization.toFixed(2) : 0}%</td>
                </tr>
                <tr key={6}>
                    <td>Success Rate</td>
                    <td>{stats ? stats.success_rate.toFixed(2) : 0}%</td>
                </tr>
            </tbody>
        </table>
    </div>
    )
}

AlgorithmStats.propTypes = {
    algorithm: PropTypes.string.isRequired,
    stats: PropTypes.object.isRequired
}

export default AlgorithmStats;