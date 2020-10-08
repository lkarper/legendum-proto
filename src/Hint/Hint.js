import React, { useState, useContext } from 'react';
import UserContext from '../contexts/UserContext';
import TokenService from '../services/token-service';
import NotesService from '../services/notes-service';
import SaveHint from '../SaveHint/SaveHint';
import './Hint.css';

const Hint = (props) => {
    const { hint } = props;

    const context = useContext(UserContext);
    
    const [showAdd, toggleShowAdd] = useState(false);
    const [noteAdded, setNoteAdded] = useState(false);
    const [apiError, setApiError] = useState(false);
    
    const handleSaveHint = (event, customNote) => {
        event.preventDefault();
        NotesService.postNote(hint.id, customNote)
            .then(note => {
                context.addNote(note);
                setNoteAdded(true);
                setApiError(false);
            })
            .catch(error => {
                console.log('error', error);
                setApiError(true);
            });
    }

    return (
        <li>
            <p className='Hint__hint-text'>{hint.hint}</p>
            {TokenService.hasAuthToken() &&
                <div className='Hint__add-hint-container'>
                    <button
                        className='Hint__toggle-show-add button' 
                        onClick={() => toggleShowAdd(!showAdd)}
                        disabled={noteAdded}    
                    >
                        {showAdd ? 'Nevermind' : 'Add Hint to Journal'}
                    </button>
                    {(showAdd && !noteAdded) && <SaveHint onSubmitHint={handleSaveHint} />}
                    {apiError && <p>Error: Could not save note. Check your connection and try again.</p>}
                    {noteAdded && <p>Note saved successfully!</p>}
                </div> 
            }
        </li>
    );
}

export default Hint;
