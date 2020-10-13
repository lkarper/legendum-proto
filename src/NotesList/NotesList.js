import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import UserContext from '../contexts/UserContext';
import Note from '../Note/Note';
import NotesListFiltersForm from '../NotesListFiltersForm/NotesListFiltersForm';
import './NotesList.css';

const NotesList = (props) => {
    const context = useContext(UserContext);

    const [chapterFilter, setChapterFilter] = useState('all');
    const [notesToShow, setNotesToShow] = useState(context.notes);
    const [sortType, setSortType] = useState('rec');

    useEffect(() => {
        const notes = [...context.notes];

        // Sorts user saved notes by date of last modification 
        if (sortType === 'old') {
            notes.sort((a, b) => new Date(a.date_modified) - new Date(b.date_modified));
        } else {
            notes.sort((a, b) => new Date(b.date_modified) - new Date(a.date_modified));
        }

        // Filters user saved notes by current chapter or all chapters
        if (chapterFilter === 'all') {
            setNotesToShow(notes);
        } else {
            const notesFiltered = notes.filter(note => note.chapter_number === parseInt(props.chapt));
            setNotesToShow(notesFiltered);
        }
    }, [chapterFilter, sortType, context.notes, props.chapt]);

    return (
        <div className={`NotesList__container-${props.suffix}`}>
            <h3 className={`NotesList__h3-${props.suffix}`}>Saved Notes:</h3>
            <NotesListFiltersForm 
                suffix={props.suffix}
                sortType={sortType}
                chapterFilter={chapterFilter}
                setSortType={setSortType}
                setChapterFilter={setChapterFilter}
            />
            {notesToShow.length 
                ?
                    <ol 
                        className='NotesList__ol'
                        aria-live='polite'
                    >
                        {notesToShow
                            .map(note => <Note key={note.id} note={note} />)
                        }
                    </ol>
                : 
                    <p>No notes saved yet.</p>
            }
        </div>
    );
}

NotesList.defaultProps = {
    chapt: '',
    suffix: '',
};

NotesList.propTypes = {
    chapt: PropTypes.string,
    suffix: PropTypes.string,
};

export default NotesList;
