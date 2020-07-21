import React from 'react';
import './DialogueResponse.css';

const DialogueResponse = (props) => {
    const { dialogue, choiceIndex, page } = props.data;
    const { responses_to_choices } = dialogue[page - 1];
    const responsesArray = responses_to_choices.split("|");
    return (
        <p className='DialogueResponse__text'>{responsesArray[choiceIndex]}</p>
    );
}

export default DialogueResponse;