import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NotesService from '../services/notes-service';
import UserContext from '../contexts/UserContext';
import SaveHint from '../SaveHint/SaveHint';
import './Note.css';

const Note = (props) => {

    const { note } = props;

    const context = useContext(UserContext);
    const [showEdit, toggleShowEdit] = useState(false);

    const onSubmitHint = (event, customNote) => {
        event.preventDefault();
        const updatedNote = {
            hint_id: note.hint_id,
            custom_note: customNote,
            date_modified: new Date().toJSON(),
        }
        NotesService.updateNote(note.id, updatedNote)
            .then(data => {
                updatedNote.id = note.id;
                updatedNote.user_id = note.user_id;
                context.updateNotes(updatedNote);
                toggleShowEdit(false);
            })
            .catch(error => {
                context.setError(error.message);
            });
    }

    const onDelete = () => {
        if (window.confirm(`Are you sure you'd like to delete this note?`)) { 
            NotesService.deleteNote(note.id)
                .then(data => {
                    context.deleteNote(note.id);
                })
                .catch(error => {
                    context.setError(error.message);
                });
        }
    }

    return (
        <li key={note.id}>
            <p>{note.hint}</p>
            {note.custom_note ? <p>{note.custom_note}</p> : ''}
            <p>From exercise: {note.exercise_title}{' '}{note.exercise_translation}</p>
            <p>Last modified: {new Date(note.date_modified).toString()}</p>
            <div className='Note__button-container'>
                <button 
                    className='Note__toggle-show-edit button'
                    onClick={() => toggleShowEdit(!showEdit)}
                >{showEdit ? 'Nevermind' : 'Edit note'}</button>
                <FontAwesomeIcon 
                    className='Note__leaf' 
                    icon={['fab', 'pagelines']} 
                />
                <button 
                    className='Note__delete-button button'
                    onClick={onDelete}
                    disabled={showEdit}
                >Delete note</button>
            </div>
            {showEdit 
                ? <SaveHint 
                    cNoteProp={note.custom_note} 
                    onSubmitHint={onSubmitHint}
                /> 
                : ''
            }
        </li>
    )
}

export default Note;