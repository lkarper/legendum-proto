import React from 'react';
import PropTypes from 'prop-types';
import Hint from '../Hint/Hint';
import './LearnHints.css';

const LearnHints = (props) => {
    const { 
        page, 
        showHintsBoolean, 
        setShowHintsBoolean, 
    } = props;

    const hideAndShowButton = showHintsBoolean 
            ? 
                <button 
                    className='LearnHints__hide-show-button button' 
                    onClick={() => setShowHintsBoolean(false)}
                >
                    Hide hints
                </button>
            : 
                <button 
                    className='LearnHints__hide-show-button button' 
                    onClick={() => setShowHintsBoolean(true)}
                >
                    Show hints
                </button>;
    
    const hintsList = (
        <ol
            className='LearnHints__ol'
        >
            {page.hints
                .sort((a, b) => a.hint_order_number - b.hint_order_number)
                .map(hint => <Hint key={hint.hint_order_number} hint={hint} />)
            }
        </ol>
    );

    return (
        <div className='LearnHints__container'>
            {hideAndShowButton}
            {showHintsBoolean && hintsList}
        </div>
    );
}

LearnHints.defaultProps = { 
    page: {
        hints: [],
    }, 
    showHintsBoolean: false, 
    setShowHintsBoolean: () => {}, 
};

LearnHints.propTypes = {
    page: PropTypes.shape({
        hints: PropTypes.arrayOf(PropTypes.object),
    }),
    showHintsBoolean: PropTypes.bool,
    setShowHintsBoolean: PropTypes.func,
};

export default LearnHints;
