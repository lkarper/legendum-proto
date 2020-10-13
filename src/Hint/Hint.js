import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
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
    
    useEffect(() => {
        if (apiError) {
            window.scrollTo(0, document.querySelector('.Hint__error').offsetTop - document.querySelector('.Header__header').offsetHeight);
        }
    }, [apiError]);

    const handleSaveHint = (event, customNote) => {
        event.preventDefault();
        NotesService.postNote(hint.id, customNote)
            .then(note => {
                context.addNote(note);
                setNoteAdded(true);
                setApiError(false);
            })
            .catch(error => {
                setApiError(true);
            });
    }

    if (Object.keys(hint).length === 0) {
        return (
            <li>
                <p>Error: Looks like something went wrong. Check your connection and try again.</p>
            </li>
        );
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
                    {apiError && <p className='Hint__error'>Error: Could not save note. Check your connection and try again.</p>}
                    {noteAdded && <p>Note saved successfully!</p>}
                </div> 
            }
        </li>
    );
}

Hint.defaultProps = {
    hint: {},
};

Hint.propTypes = {
    hint: PropTypes.object,
};

export default Hint;
