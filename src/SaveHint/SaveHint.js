import React, { useState } from 'react';
import ValidateCustomNote from '../ValidateCustomNote/ValidateCustomNote';

const SaveHint = (props) => {

    const { onSubmitHint, cNoteProp = '' } = props;

    const [customNote, setCustomNote] = useState(cNoteProp);
    const [customNoteError, setCustomNoteError] = useState('');

    return (
        <div>
            <form onSubmit={(e) => onSubmitHint(e, customNote)}>
                <textarea
                    id="custom-note"
                    name="custom-note"
                    aria-label="Add a custom note here, if you'd like."
                    placeholder="Add a custom note here, if you'd like."
                    rows="4"
                    cols="50"
                    value={customNote}
                    onChange={(e) => setCustomNote(e.target.value)}
                ></textarea>
                <button 
                    type="submit"
                    disabled={!!customNoteError}
                >Save Hint</button>
                <ValidateCustomNote 
                    customNote={customNote}
                    customNoteError={customNoteError}
                    setCustomNoteError={setCustomNoteError}
                />
            </form>
        </div>
    )
}

export default SaveHint;