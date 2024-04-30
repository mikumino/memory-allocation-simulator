import PropTypes from 'prop-types';
import { useEffect } from 'react';

const Toast = ({ message, type, setShow }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, [setShow]);

    return (
        <div className="toast toast-bottom">
            <div className={`alert alert-${type}`}>
                {message}
            </div>
        </div>
    )
}

Toast.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    setShow: PropTypes.func.isRequired
}

export default Toast;