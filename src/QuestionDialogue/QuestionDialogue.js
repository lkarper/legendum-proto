import React from 'react';

const QuestionDialogue = (props) => {
    const { page, savedUserInput } = props;
    
    if (page.dialogue_look_back) {
        const dialogueArray = page.dialogue.split('|');
        const dialogueToDisplay = `${dialogueArray[0]}${savedUserInput[page.dialogue_to_look_for]}${dialogueArray[1]}`;
        return <p>{dialogueToDisplay}</p>;
    }

    return <p>{page.dialogue}</p>;
}

export default QuestionDialogue;