import React, { useState, useEffect } from 'react';
import TokenService from '../services/token-service';
import NotesService from '../services/notes-service';

const UserContext = React.createContext({
    notes: [],
    progress: [],
    error: null,
    setNotes: () => {},
    addNote: () => {},
    setError: () => {},
    clearError: () => {},
    setProgress: () => {},
    clearProgress: () => {},
});

export default UserContext;

export const UserProvider = (props) => {

    const [notes, setNotes] = useState([]);
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
        }
    }, [props]);
    
    const addNote = (note) => {
        setNotes(...notes, note);
    }
    
    const value = {
        notes,
        error,
        setError,
        setNotes,
        addNote,
    };

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    )
}