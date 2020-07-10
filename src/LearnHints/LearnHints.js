import React from 'react';

const LearnHints = (props) => {
    const { page, showHintsBoolean, setShowHintsBoolean } = props;

    const hideAndShowButton = showHintsBoolean 
            ? <button onClick={() => setShowHintsBoolean(false)}>Hide hints</button>
            : <button onClick={() => setShowHintsBoolean(true)}>Show hints</button>
        ;
    
    const hintsList = (
        <ol>
            {page.hints
                .split('|')
                .map((hint, i) => (
                    <li key={i}>
                        <p>{hint}</p>
                        <button>Save hint</button>
                    </li>
                ))}
        </ol>
    );

    return (
        <div>
            {hideAndShowButton}
            {showHintsBoolean ? hintsList : ''}
        </div>
    );
}

export default LearnHints;