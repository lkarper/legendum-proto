import React, { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import Note from '../Note/Note';

const NotesList = (props) => {

    const context = useContext(UserContext);

    return (
        <div className={`NotesList__container-${props.suffix}`}>
            <h2>Saved Notes:</h2>
            {context.notes.length ?
                <ol>
                    {context.notes
                        .map(note => <Note key={note.id} note={note}/> )
                    }
                </ol>
                : <p>No notes saved yet.</p>
            }
        </div>
    )
}

export default NotesList;