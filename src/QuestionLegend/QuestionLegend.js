import React from 'react';

const QuestionLegend = (props) => {
    const { 
        page, 
        savedUserInput, 
    } = props;

    if (page.look_back) {
        const questionArray = page.question.split('|');
        const questionToDisplay = `${questionArray[0]}${savedUserInput[page.property_to_look_for]}${questionArray[1]}`;
        return <legend>{questionToDisplay}</legend>;
    }

    return <legend>{page.question}</legend>;
}

export default QuestionLegend;
