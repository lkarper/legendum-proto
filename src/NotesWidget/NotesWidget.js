import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TokenService from '../services/token-service';
import NotesList from '../NotesList/NotesList';
import './NotesWidget.css';

const NotesWidget = (props) => {
    const [showList, toggleShowList] = useState(false);

    const notesListContainerClassSuffix = showList ? 'widget-list on' : 'widget-list off';

    // Users must be logged in to save notes
    if (TokenService.hasAuthToken()) {
        return (
            <>
                <button
                    className='NotesWidget__toggle-button button'
                    onClick={() => toggleShowList(!showList)}
                >
                    My notes
                </button>
                <div className={`NotesWidget__outer-container-${notesListContainerClassSuffix}`}>
                    <button
                        className='NotesWidget__outer-container-close-button button'
                        onClick={() => toggleShowList(false)}
                    >
                        &#10006;
                    </button>
                    <NotesList 
                        chapt={props.match.params.chapt} 
                        suffix={'widget-list'} 
                    />
                </div>
            </>
        );
    }

    return <></>;
}

NotesWidget.defaultProps = {
    match: {
        params: {
            chapt: '',
        },
    },
};

NotesWidget.propTypes = {
    match: PropTypes.object,
};

export default NotesWidget;
