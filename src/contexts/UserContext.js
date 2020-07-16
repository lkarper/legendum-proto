import React, { useState, useEffect } from 'react';
import TokenService from '../services/token-service';
import NotesService from '../services/notes-service';
import ProgressService from '../services/progress-service';
import ExercisesService from '../services/exercises-service';

const UserContext = React.createContext({
    notes: [],
    progress: [],
    error: null,
    exercises: [],
    setNotes: () => {},
    addNote: () => {},
    updateNotes: () => {},
    deleteNote: () => {},
    setError: () => {},
    clearError: () => {},
    updateProgress: () => {},
    setProgress: () => {},
});

export default UserContext;

export const UserProvider = (props) => {

    const [notes, setNotes] = useState([]);
    const [progress, setProgress] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (TokenService.hasAuthToken()) {
            NotesService.getNotesByUser()
                .then(notes => {
                    setNotes(notes);
                })
                .catch(error => {
                    setError(error);
                });
            ProgressService.getProgressByUser()
                .then(progress => {
                    setProgress(progress);
                })
                .catch(error => {
                    setError(error.message);
                });
        }
        ExercisesService.getAllExercises()
            .then(exercises => {
                setExercises(exercises);
            })
            .catch(error => {
                setError(error.message);
            });

    }, [props]);

    const updateProgress = (newProgressObject) => {
        const newProgress = [...progress, newProgressObject];
        setProgress(newProgress);
    }
    
    const addNote = (note) => {
        setNotes(...notes, note);
    }
    
    const updateNotes = (newNote) => {
        const updatedNote = notes.find(n => n.id === newNote.id);
        updatedNote.hint_id = newNote.hint_id;
        updatedNote.custom_note = newNote.custom_note;
        updatedNote.date_modified = newNote.date_modified;
        const newNotes = [...notes.filter(n => n.id !== updatedNote.id), updatedNote];
        setNotes(newNotes);
    }

    const deleteNote = (noteIdToDelete) => {
        const newNotes = notes.filter(n => n.id !== noteIdToDelete);
        setNotes(newNotes);
    }

    const value = {
        notes,
        error,
        progress,
        exercises,
        setError,
        setNotes,
        addNote,
        updateNotes,
        deleteNote,
        updateProgress,
        setProgress,
    };

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    )
}