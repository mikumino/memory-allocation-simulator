import PropTypes from 'prop-types';

const ProcessRow = ({ process, handleProcessSelection }) => {
    return(
        <tr className={`hover:bg-base-200 transition-all`} onClick={() => handleProcessSelection(process)}>
            <td>{process.id}</td>
            <td>{process.size}</td>
        </tr>
    )
};

ProcessRow.propTypes = {
    process: PropTypes.object.isRequired,
    handleProcessSelection: PropTypes.func.isRequired
};

export default ProcessRow;