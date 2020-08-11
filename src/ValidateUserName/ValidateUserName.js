import React, { useEffect } from 'react';

const ValidateUserName = (props) => {
    const { userNameError } = props;

    useEffect(() => {
        const { setUserNameError, userName } = props;
        if (!userName.trim().length) {
            setUserNameError('Username required.');
        } else {
            setUserNameError(null);
        }
    }, [props]);

    if (userNameError) {
        return (
            <div 
                role="alert"
            >
                <p 
                    id="username-required"
                    style={{ color: 'darkred' }}
                >
                    {userNameError}
                </p>
            </div>
        );
    }
    return <p id="username-required">Username meets requirements.</p>;
}

export default ValidateUserName;