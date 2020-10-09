import React, { useEffect } from 'react';

const ValidateUserName = (props) => {
    const { 
        userNameError, 
        setUserNameError, 
        userName,
    } = props;

    useEffect(() => {
        if (!userName.trim().length) {
            setUserNameError('Username required.');
        } else {
            setUserNameError(null);
        }
    }, [userName, setUserNameError]);

    const validationMessage  = userNameError 
        ?             
            <p 
                id="username-required"
                style={{ color: 'darkred' }}
            >
                {userNameError}
            </p>
        : 
            <p 
                id="username-required"
            >
                Username meets requirements.
            </p>;
    
    return (
        <div 
            role="alert"
        >
            {validationMessage}
        </div>
    );
}

export default ValidateUserName;
