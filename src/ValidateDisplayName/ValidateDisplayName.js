import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const ValidateDisplayName = (props) => {
    const { 
        displayName,
        displayNameError,
        setDisplayNameError,
    } = props;

    useEffect(() => {
        if (!displayName.trim().length) {
            setDisplayNameError('Displayname required.');
        } else {
            setDisplayNameError('');
        }
    }, [displayName, setDisplayNameError]);

    const validationMessage = displayNameError
        ? 
            <p 
                id="display-name-required"
                style={{ color: 'darkred' }}
            >
                {displayNameError}
            </p>
        : 
            <p 
                id="display-name-required"
            >
                Display name meets requirements.
            </p>;
    
    return (
        <div role="alert">
            {validationMessage}        
        </div>
    ); 
}

ValidateDisplayName.defaultProps = { 
    displayName: '',
    displayNameError: '',
    setDisplayNameError: () => {},
};

ValidateDisplayName.propTypes = { 
    displayName: PropTypes.string,
    displayNameError: PropTypes.string,
    setDisplayNameError: PropTypes.func,
};

export default ValidateDisplayName;
