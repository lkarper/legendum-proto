import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const ValidateReenterPassword = (props) => {
    const { 
        password,
        reenterPassword,
        reenterPasswordError,
        setReenterPasswordError,
    } = props;

    useEffect(() => {
        if (password === reenterPassword) {
            setReenterPasswordError('');
        } else {
            setReenterPasswordError('Passwords do not match.');
        }
    }, [password, reenterPassword, reenterPasswordError, setReenterPasswordError]);

    const validationMessage = reenterPasswordError
        ? 
            <p 
                id='reenter-password-error'
                style={{ color: 'darkred' }}
            >
                {reenterPasswordError}
            </p>
        :
            <p id='reenter-password-error'>Passwords match.</p>;

    return (
        <div role='alert'>
            {validationMessage}
        </div>
    );
}

ValidateReenterPassword.defaultProps = {
    password: '', 
    reenterPassword: '', 
    reenterPasswordError: '',
    setReenterPasswordError: () => {},
};

ValidateReenterPassword.propTypes = {
    password: PropTypes.string.isRequired, 
    reenterPassword: PropTypes.string.isRequired, 
    reenterPasswordError: PropTypes.string.isRequired,
    setReenterPasswordError: PropTypes.func.isRequired,
};

export default ValidateReenterPassword;
