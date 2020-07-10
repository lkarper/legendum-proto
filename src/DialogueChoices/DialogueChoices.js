import React from 'react';
import DialogueResponse from '../DialogueResponse/DialogueResponse';

const DialogueChoices = (props) => {
    const {dialogue, page, setResponse } = props.data;
    const { choices } = dialogue[page - 1];
    const choicesHTML = choices.split('|').map((choice, i) => <button key={i} onClick={() => setResponse(<DialogueResponse data={{dialogue, page, choiceIndex: i}}/>)}>{choice}</button>)
    return (
        <div>
            {choicesHTML}
        </div>
    );
}

export default DialogueChoices;