import React from 'react';
import './QuestionDialogue.css';

const QuestionDialogue = (props) => {
    const { page, savedUserInput } = props;
    
    if (page.dialogue_look_back) {
        const dialogueArray = page.dialogue.split('|');
        const dialogueToDisplay = `${dialogueArray[0]}${savedUserInput[page.dialogue_to_look_for]}${dialogueArray[1]}`;
        return <p className='QuestionDialogue__text'>{dialogueToDisplay}</p>;
    }

    return <p className='QuestionDialogue__text'>{page.dialogue}</p>;
}

export default QuestionDialogue;