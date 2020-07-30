import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../contexts/UserContext';
import Note from '../Note/Note';
import './NotesList.css';
import NotesListFiltersForm from '../NotesListFiltersForm/NotesListFiltersForm';

const NotesList = (props) => {

    const context = useContext(UserContext);

    const [chapterFilter, setChapterFilter] = useState('all');
    const [notesToShow, setNotesToShow] = useState(context.notes);
    const [sortType, setSortType] = useState('rec');

    useEffect(() => {
        const notes = [...context.notes];

        if (sortType === 'old') {
            notes.sort((a, b) => new Date(a.date_modified) - new Date(b.date_modified));
        } else {
            notes.sort((a, b) => new Date(b.date_modified) - new Date(a.date_modified));
        }

        if (chapterFilter === 'all') {
            setNotesToShow(notes);
        } else {
            const notesFiltered = notes.filter(note => note.exercise_id === parseInt(props.chapt));
            setNotesToShow(notesFiltered);
        }
    }, [chapterFilter, sortType, context.notes, props.chapt])

    return (
        <div className={`NotesList__container-${props.suffix}`}>
            <h2 className={`NotesList__h2-${props.suffix}`}>Saved Notes:</h2>
            <NotesListFiltersForm 
                suffix={props.suffix}
                sortType={sortType}
                chapterFilter={chapterFilter}
                setSortType={setSortType}
                setChapterFilter={setChapterFilter}
            />
            {notesToShow.length ?
                <ol>
                    {notesToShow
                        .map(note => <Note key={note.id} note={note}/> )
                    }
                </ol>
                : <p>No notes saved yet.</p>
            }
        </div>
    )
}

export default NotesList;