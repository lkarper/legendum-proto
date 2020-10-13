import React from 'react';
import PropTypes from 'prop-types';

const QuestionLegend = (props) => {
    const { 
        page, 
        savedUserInput, 
    } = props;

    if (Object.keys(page).length === 0) {
        return <p>Error: Looks like something went wrong. Check your connection and try again.</p>;
    } else if (page.look_back) {
        /* 
            If a question contains a 'look_back', then the app alters the question based on user input; 
            the user's input is inserted into the question
        */
        const questionArray = page.question.split('|');
        const questionToDisplay = `${questionArray[0]}${savedUserInput[page.property_to_look_for]}${questionArray[1]}`;
        return <legend>{questionToDisplay}</legend>;
    }

    return <legend>{page.question}</legend>;
}

QuestionLegend.defaultProps = {
    page: {},
    savedUserInput: {},
};

QuestionLegend.propTypes = {
    page: PropTypes.object,
    savedUserInput: PropTypes.object,
};

export default QuestionLegend;
