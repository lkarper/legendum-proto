import React, { useState } from 'react';
import TokenService from '../services/token-service';
import NotesList from '../NotesList/NotesList';
import './NotesWidget.css';

const NotesWidget = (props) => {

    const [showList, toggleShowList] = useState(false);

    const notesListContainerClassSuffix = showList ? 'widget-list on' : 'widget-list off';

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
                    <NotesList chapt={props.match.params.chapt} suffix={'widget-list'} />
                </div>
            </>
        );
    }
    return <></>;
}

export default NotesWidget;