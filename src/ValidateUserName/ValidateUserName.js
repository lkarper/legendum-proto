import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

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
            setUserNameError('');
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

ValidateUserName.defaultProps = { 
    userNameError: '', 
    setUserNameError: () => {}, 
    userName: '',
};

ValidateUserName.propTypes = { 
    userNameError: PropTypes.string, 
    setUserNameError: PropTypes.func, 
    userName: PropTypes.string,
};

export default ValidateUserName;
