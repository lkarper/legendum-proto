import React from 'react';
import PropTypes from 'prop-types';
import './QuestionDialogue.css';

const QuestionDialogue = (props) => {
    const { 
        page, 
        savedUserInput,
    } = props;
    
    if (Object.keys(page).length === 0) {
        return <p>Error: Looks like something went wrong. Check your connection and try again.</p>;
    } else if (page.dialogue_look_back) {

        /* 
            If a page contains a 'dialogue_look_back', then the app alters the dialogue based on user input; 
            the user's input is inserted into the dialogue
        */
        const dialogueArray = page.dialogue.split('|');
        const dialogueToDisplay = `${dialogueArray[0]}${savedUserInput[page.dialogue_to_look_for]}${dialogueArray[1]}`;
        return <p className='QuestionDialogue__text'>{dialogueToDisplay}</p>;
    }

    return <p className='QuestionDialogue__text'>{page.dialogue}</p>;
}

QuestionDialogue.defaultProps = {
    page: {},
    savedUserInput: {},
};

QuestionDialogue.propTypes = {
    page: PropTypes.object,
    savedUserInput: PropTypes.object,
};

export default QuestionDialogue;
