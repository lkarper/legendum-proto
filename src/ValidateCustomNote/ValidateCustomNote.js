import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const ValidateCustomNote = (props) => {
    const { 
        customNoteError,
        customNote,
        setCustomNoteError,
    } = props;

    useEffect(() => {
        if (customNote.length && !/\w|\d/.test(customNote)) {
            setCustomNoteError('Note must contain at least one letter or number');
        } else if (customNote.length > 1000) {
            setCustomNoteError('Note cannot exceed 1000 characters in length.');
        } else {
            setCustomNoteError('');
        }

    }, [customNote, setCustomNoteError]);

    return (
        <div role="alert">
            {customNoteError}
        </div>
    );
}

ValidateCustomNote.defaultProps = { 
    customNoteError: '',
    customNote: '',
    setCustomNoteError: () => {},
};

ValidateCustomNote.propTypes = { 
    customNoteError: PropTypes.string,
    customNote: PropTypes.string,
    setCustomNoteError: PropTypes.func,
};

export default ValidateCustomNote;
