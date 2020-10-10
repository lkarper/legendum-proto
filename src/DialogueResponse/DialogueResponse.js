import React from 'react';
import PropTypes from 'prop-types';
import './DialogueResponse.css';

const DialogueResponse = (props) => {
    const { 
        dialogue, 
        choiceIndex, 
        page,
    } = props;

    if (dialogue.length === 0) {
        return (
            <p 
                className='DialogueResponse__text'
            >
                Error: Something went wrong. Check your connection and try again.
            </p>
        );
    } else {
        const { responses_to_choices } = dialogue[page - 1];

        const responsesArray = responses_to_choices.split("|");
        
        return (
            <p 
                className='DialogueResponse__text'
            >
                {responsesArray[choiceIndex]}
            </p>
        );
    }
}

DialogueResponse.defaultProps = { 
    dialogue: [], 
    choiceIndex: 0, 
    page: 1,
};

DialogueResponse.propTypes = { 
    dialogue: PropTypes.array, 
    choiceIndex: PropTypes.number, 
    page: PropTypes.number,
};

export default DialogueResponse;
