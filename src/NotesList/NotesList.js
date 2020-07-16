import React, { useContext, useState } from 'react';
import UserContext from '../contexts/UserContext';
import SaveHint from '../SaveHint/SaveHint';

const NotesList = (props) => {

    const context = useContext(UserContext);
    const [showEdit, toggleShowEdit] = useState(false);

    const onSubmitHint = (e, customNote) => {

    }

    return (
        <div>
            <h2>Saved Notes:</h2>
            {context.notes.length ?
                <ol>
                    {context.notes
                        .map(note => (
                            <li key={note.id}>
                                <p>{note.hint}</p>
                                {note.custom_note ? <p>{note.custom_note}</p> : ''}
                                <p>From exercise: {note.exercise_title}: {note.exercise_translation}</p>
                                <p>Lost modified: {new Date(note.date_modified).toString()}</p>
                                <button>Edit note</button>
                                <button>Delete note</button>
                                {showEdit 
                                    ? <SaveHint cNoteProp={note.custom_note} onSubmitHint={onSubmitHint} /> 
                                    : ''
                                }
                            </li>
                        ))
                    }
                </ol>
                : <p>No notes saved yet.</p>
            }
        </div>
    )
}

export default NotesList;