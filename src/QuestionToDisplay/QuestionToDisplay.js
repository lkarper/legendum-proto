import React from 'react';
import MultipleChoice from '../MultipleChoice/MultipleChoice';
import Input from '../Input/Input';
import TrueFalse from '../TrueFalse/TrueFalse';

const QuestionToDisplay = (props) => {
    const { 
        pageToDisplay, 
        savedUserInput, 
        checkAnswer,
    } = props;

    if (pageToDisplay.question_type === 'multiple-choice') {
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

export default QuestionToDisplay;
