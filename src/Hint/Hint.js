import React, { useState, useContext } from 'react';
import UserContext from '../contexts/UserContext';
import TokenService from '../services/token-service';
import NotesService from '../services/notes-service';
import SaveHint from '../SaveHint/SaveHint';

const Hint = (props) => {

    const context = useContext(UserContext);
    
    const [showAdd, toggleShowAdd] = useState(false);
    const [noteAdded, setNoteAdded] = useState(false);

    const { hint } = props;

    
    const handleSaveHint = (event, customNote) => {
        event.preventDefault();
        NotesService.postNote(hint.id, customNote)
            .then(note => {
                context.addNote(note);
                setNoteAdded(true);
            })
            .catch(error => {
                context.setError(error);
            });
    }

    return (
        <li>
            <p>{hint.hint}</p>
            {TokenService.hasAuthToken() 
                ? <div>
                    <button 
                        onClick={() => toggleShowAdd(!showAdd)}
                        disabled={noteAdded}    
                    >
                        {showAdd ? 'Nevermind' : 'Add Hint to Journal'}
                    </button>
                    {showAdd && !noteAdded ? <SaveHint onSubmitHint={handleSaveHint} /> : ''}
                    {noteAdded ? <p>Note saved successfully!</p> : ''}
                </div> 
                : ''
            }
        </li>
    );

}

export default Hint;