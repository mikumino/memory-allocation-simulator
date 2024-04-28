import PropTypes from 'prop-types';

const JustifyBtwnRow = ({ children }) => {
    return (
        <div className="flex flex-row w-full items-center justify-between">
            {children}
        </div>
    )
}

JustifyBtwnRow.propTypes = {
    children: PropTypes.node.isRequired,
}

export default JustifyBtwnRow;