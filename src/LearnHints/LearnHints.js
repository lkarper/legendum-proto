import React from 'react';
import Hint from '../Hint/Hint';

const LearnHints = (props) => {
    const { page, showHintsBoolean, setShowHintsBoolean } = props;

    const hideAndShowButton = showHintsBoolean 
            ? <button onClick={() => setShowHintsBoolean(false)}>Hide hints</button>
            : <button onClick={() => setShowHintsBoolean(true)}>Show hints</button>
        ;
    
    const hintsList = (
        <ol>
            {page.hints
                .sort((a, b) => a.hint_order_number - b.hint_order_number)
                .map(hint => (
                    <Hint key={hint.hint_order_number} hint={hint} /> 
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