import React, { useEffect } from 'react';

const ValidateDisplayName = (props) => {

    const { displayNameError } = props;

    useEffect(() => {
        const { displayName, setDisplayNameError } = props;
        if (!displayName.trim().length) {
            setDisplayNameError('Displayname must contain at least 1 character');
        } else {
            setDisplayNameError(null);
        }
    }, [props]);

    if (displayNameError) {
        return (
            <div role="alert">
                <p id="display-name-required">{displayNameError}</p>
            </div>
        );
    }
    return <p id="display-name-required">Display name required.</p>;
}

export default ValidateDisplayName;