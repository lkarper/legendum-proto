import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ValidateCustomNote from '../ValidateCustomNote/ValidateCustomNote';
import './SaveHint.css';

const SaveHint = (props) => {
    const { 
        onSubmitHint, 
        cNoteProp, 
    } = props;

    const [customNote, setCustomNote] = useState(cNoteProp);
    const [customNoteError, setCustomNoteError] = useState('');

    return (
        <form 
            className='SaveHint__form'
            onSubmit={(e) => onSubmitHint(e, customNote)}
        >
            <textarea
                className='SaveHint__textarea'
                id='custom-note'
                name='custom-note'
                aria-label={`Add a custom note here, if you'd like.`}
                placeholder={`Add a custom note here, if you'd like.`}
                rows='4'
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
            />
            <button 
                className='SaveHint__submit button'
                type='submit'
                disabled={!!customNoteError}
            >
                Save Hint
            </button>
            <ValidateCustomNote 
                customNote={customNote}
                customNoteError={customNoteError}
                setCustomNoteError={setCustomNoteError}
            />
        </form>
    );
}

SaveHint.defaultProps = { 
    onSubmitHint: () => {}, 
    cNoteProp: '', 
};

SaveHint.propTypes = { 
    onSubmitHint: PropTypes.func, 
    cNoteProp: PropTypes.string, 
};

export default SaveHint;
