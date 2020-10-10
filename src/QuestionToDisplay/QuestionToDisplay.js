import React from 'react';
import PropTypes from 'prop-types';
import MultipleChoice from '../MultipleChoice/MultipleChoice';
import Input from '../Input/Input';
import TrueFalse from '../TrueFalse/TrueFalse';

const QuestionToDisplay = (props) => {
    const { 
        pageToDisplay, 
        savedUserInput, 
        checkAnswer,
    } = props;

    if (Object.keys(pageToDisplay).length === 0) {
        return (
            <p>Error: Looks like something went wrong. Check your connection and try again.</p>
        );        
    } else if (pageToDisplay.question_type === 'multiple-choice') {
        return (
            <MultipleChoice 
                page={pageToDisplay} 
                savedUserInput={savedUserInput} 
                checkAnswer={checkAnswer} 
            />
        );
    } else if (pageToDisplay.question_type === 'input') {
        return (
            <Input 
                page={pageToDisplay} 
                savedUserInput={savedUserInput} 
                checkAnswer={checkAnswer} 
            />
        );
    } else {
        return (
            <TrueFalse 
                page={pageToDisplay} 
                savedUserInput={savedUserInput} 
                checkAnswer={checkAnswer} 
            />
        );
    }
}

QuestionToDisplay.defaultProps = { 
    pageToDisplay: {}, 
    savedUserInput: {}, 
    checkAnswer: () => {},
};

QuestionToDisplay.propTypes = { 
    pageToDisplay: PropTypes.object, 
    savedUserInput: PropTypes.object, 
    checkAnswer: PropTypes.func,
};

export default QuestionToDisplay;
