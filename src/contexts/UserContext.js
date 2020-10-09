import React, { useState } from 'react';

const UserContext = React.createContext({
    notes: [],
    progress: [],
    error: false,
    exercises: [],
    setExercises: () => {},
    setNotes: () => {},
    addNote: () => {},
    updateNotes: () => {},
    deleteNote: () => {},
    setError: () => {},
    updateProgress: () => {},
    setProgress: () => {},
});

export default UserContext;

export const UserProvider = (props) => {

    const [notes, setNotes] = useState([]);
    const [progress, setProgress] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [error, setError] = useState(false);

    const updateProgress = (newProgressObject) => {
        const newProgress = [...progress, newProgressObject];
        setProgress(newProgress);
    }
    
    const addNote = (note) => {
        setNotes([...notes, note]);
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
        setExercises,
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
