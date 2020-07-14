import React, { useEffect } from 'react';

const ValidateUserName = (props) => {
    const { userNameError } = props;

    useEffect(() => {
        const { setUserNameError, userName } = props;
        if (userName.length && !userName.trim().length) {
            setUserNameError('Username must contain at least 1 character')
        } else {
            setUserNameError(null);
        }
    }, [props]);

    if (userNameError) {
        return (
            <div role="alert">
                <p id="username-required">{userNameError}</p>
            </div>
        );
    }
    return <p id="username-required">Username required.</p>;
}

export default ValidateUserName;