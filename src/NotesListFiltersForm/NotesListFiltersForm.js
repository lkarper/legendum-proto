import React from 'react';
import './NotesListFiltersForm.css';

const NotesListFiltersForm = (props) => {
    const { 
        suffix, 
        sortType, 
        chapterFilter, 
        setSortType, 
        setChapterFilter, 
    } = props;

    return (
        <form 
            className={`NotesListFiltersForm__form-${suffix}`}
        >
            {/* 
                If suffix is set to 'widget-list' then the component is being used within a lesson.
                If this is the case, then it is useful to be able to filter notes by chapter.    
            */}
            {suffix === 'widget-list' &&
                <fieldset>
                    <legend>Filter by chapter</legend>
                    <div>
                        <input 
                            type='radio'
                            id='show-all-notes'
                            name='filter-notes'
                            checked={chapterFilter === 'all'}
                            value='all'
                            onChange={(e) => setChapterFilter(e.target.value)}
                        />
                        <label htmlFor='show-all-notes'>Show all notes</label> 
                    </div>
                    <div>
                        <input 
                            type='radio'
                            id='show-chapt-notes'
                            name='filter-notes'
                            checked={chapterFilter === 'chapt'}
                            value='chapt'
                            onChange={(e) => setChapterFilter(e.target.value)}
                        />
                        <label htmlFor='show-chapt-notes'>Show notes from current chapter only</label> 
                    </div>
                </fieldset>
            }
            <fieldset>
                <legend>Sort by date saved</legend>
                <div>
                    <input
                        type='radio'
                        id='sort-rec'
                        name='sort-notes'
                        checked={sortType === 'rec'}
                        value='rec'
                        onChange={(e) => setSortType(e.target.value)}
                    />
                    <label htmlFor='sort-rec'>Sort notes newest - oldest</label>
                </div>
                <div>
                    <input
                        type='radio'
                        id='sort-old'
                        name='sort-notes'
                        checked={sortType === 'old'}
                        value='old'
                        onChange={(e) => setSortType(e.target.value)}
                    />
                    <label htmlFor='sort-old'>Sort notes oldest - newest</label>
                </div>
            </fieldset>
        </form>
    );
}

export default NotesListFiltersForm;
