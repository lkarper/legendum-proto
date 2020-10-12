import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import QuestionDialogue from '../QuestionDialogue/QuestionDialogue';
import QuestionLegend from '../QuestionLegend/QuestionLegend';
import './MultipleChoice.css';

const MultipleChoice = (props) => {
    const { 
        page, 
        savedUserInput, 
        checkAnswer, 
    } = props;

    const [userChoice, setChoice] = useState();
    const [shuffledChoices, setShuffledChoices]= useState([]);

    useEffect(() => {
        if (Object.keys(page).length !== 0) {
            const { 
                correct_response, 
                incorrect_response_option_1, 
                incorrect_response_option_2, 
                incorrect_response_option_3, 
            } = page;
    
            const choicesArray = [
                correct_response,
                incorrect_response_option_1,
                incorrect_response_option_2,
                incorrect_response_option_3,
            ].filter(choice => choice !== '');
    
            const shuffledChoices = [];
    
            while (choicesArray.length > 0) {
                const randomNumber = Math.floor(Math.random() * choicesArray.length);
                shuffledChoices.push(choicesArray[randomNumber]);
                choicesArray.splice(randomNumber, 1);
            }
    
            setShuffledChoices(shuffledChoices);    
        }
    }, [page]);

    const choicesHTMLArray = shuffledChoices
        .filter(choice => choice !== '')
        .map((choice, i) => 
            <div 
                key={choice}
                className='MultipleChoice__input-div'
            >
                <input 
                    className='MultipleChoice__input radio'
                    type='radio'
                    id={`choice_${i}`}
                    name='user-response'
                    value={choice}
                    checked={userChoice === choice}
                    onChange={(e) => setChoice(e.target.value)}
                    required
                />
                <label htmlFor={`choice_${i}`}>{choice}</label>
            </div>
        );

    if (Object.keys(page).length === 0) {
        return (
            <p>Error: Looks like something went wrong. Check your connection and try again.</p>
        );
    }

    return (
        <div className='MultipleChoice__container'>
            <QuestionDialogue 
                page={page} 
                savedUserInput={savedUserInput} 
            />
            <form
                onSubmit={(e) => {
                    checkAnswer(e, userChoice);
                    setChoice();
                }}
            >
                <fieldset>
                    <QuestionLegend 
                        page={page} 
                        savedUserInput={savedUserInput} 
                    />
                    {choicesHTMLArray}
                </fieldset>
                <button
                    className='MultipleChoice__submit button' 
                    type='submit'
                    disabled={!userChoice}
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

MultipleChoice.defaultProps = { 
    page: {}, 
    savedUserInput: {}, 
    checkAnswer: () => {}, 
};

MultipleChoice.propTypes = {
    page: PropTypes.object,
    savedUserInput: PropTypes.object,
    checkAnswer: PropTypes.func,
};

export default MultipleChoice;
