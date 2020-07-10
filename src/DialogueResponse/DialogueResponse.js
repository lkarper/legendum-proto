import React from 'react';

const DialogueResponse = (props) => {
    const { dialogue, choiceIndex, page } = props.data;
    const { responses_to_choices } = dialogue[page - 1];
    const responsesArray = responses_to_choices.split("|");
    return (
        <p>{responsesArray[choiceIndex]}</p>
    );
}

export default DialogueResponse;