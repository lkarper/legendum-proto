import React, { useEffect } from 'react';

const ValidateReenterPassword = (props) => {
    const { reenterPasswordError } = props;

    useEffect(() => {
        const { setReenterPasswordError, password, reenterPassword } = props;
        if (password === reenterPassword) {
            setReenterPasswordError(null);
        } else {
            setReenterPasswordError('Passwords do not match.');
        }
    }, [props]);

    if (!reenterPasswordError) {
        return (
            <p id="reenter-password-error">Passwords match.</p>
        );
    } else {
        return (
            <div role="alert">
                <p 
                    id="reenter-password-error"
                    style={{ color: 'darkred' }}
                >
                    {reenterPasswordError}
                </p>
            </div>
        ); 
    }
}

export default ValidateReenterPassword;