import React, { useEffect } from 'react';

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
                id="reenter-password-error"
                style={{ color: 'darkred' }}
            >
                {reenterPasswordError}
            </p>
        :
            <p id="reenter-password-error">Passwords match.</p>;

    return (
        <div role="alert">
            {validationMessage}
        </div>
    );
}

export default ValidateReenterPassword;
