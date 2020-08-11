import React, { useEffect } from 'react';

const ValidateDisplayName = (props) => {

    const { displayNameError } = props;

    useEffect(() => {
        const { displayName, setDisplayNameError } = props;
        if (!displayName.trim().length) {
            setDisplayNameError('Displayname required.');
        } else {
            setDisplayNameError(null);
        }
    }, [props]);

    if (displayNameError) {
        return (
            <div role="alert">
                <p 
                    id="display-name-required"
                    style={{ color: 'darkred' }}
                >
                    {displayNameError}
                </p>
            </div>
        );
    }
    return <p id="display-name-required">Display name meets requirements.</p>;
}

export default ValidateDisplayName;