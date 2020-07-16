import React, { useContext } from 'react';
import UserContext from '../contexts/UserContext';

const NotesList = (props) => {
    const context = useContext(UserContext);

    return (
        <div>
            <h2>Saved Notes:</h2>
            {context.notes.length ?
                <ol>
                    {context.notes
                        .map(note => (
                            <li key={note.id}>
                                <p>{note.hint}</p>
                                {note.custom_note ? <p>note.custom_note</p> : ''}
                                <p>From exercise: {note.exercise_title}: {note.exercise_translation}</p>
                                <p>Lost modified: {new Date(note.date_modified).toString()}</p>
                                <button>Edit note</button>
                                <button>Delete note</button>
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