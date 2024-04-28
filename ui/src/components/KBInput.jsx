import PropTypes from 'prop-types';

const KBInput = ({ label, value, onChange, className='' }) => {
    return (
        <div className={`flex flex-row w-full justify-between items-center ${className}`}>
            <label htmlFor={label}>{label}:</label>
            <div className="flex flex-row items-center">
                <input className="input input-bordered" type='number' id={label} value={value} onChange={(e) => onChange(parseInt(e.target.value))} />
                <span className="ml-4">KB</span>
            </div>
        </div>
    )
}

KBInput.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    className: PropTypes.string,
}

export default KBInput;