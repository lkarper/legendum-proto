import React, { useState, useEffect } from 'react';
import QuestionDialogue from '../QuestionDialogue/QuestionDialogue';
import QuestionLegend from '../QuestionLegend/QuestionLegend';
import './MultipleChoice.css';

const MultipleChoice = (props) => {

    const [userChoice, setChoice] = useState();
    const [shuffledChoices, setShuffledChoices]= useState([]);

    const { page, savedUserInput, checkAnswer } = props;

    useEffect(() => {
        const { correct_response, incorrect_response_option_1, incorrect_response_option_2, incorrect_response_option_3 } = page;
        const choicesArray = [
            correct_response,
            incorrect_response_option_1,
            incorrect_response_option_2,
            incorrect_response_option_3,
        ].filter(choice => choice !== null);

        const shuffledChoices = [];

        while (choicesArray.length > 0) {
            const randomNumber = Math.floor(Math.random() * choicesArray.length);
            shuffledChoices.push(choicesArray[randomNumber]);
            choicesArray.splice(randomNumber, 1);
        }

        setShuffledChoices(shuffledChoices);
    }, [page]);

    const choicesHTMLArray = shuffledChoices
        .filter(choice => choice != null)
        .map((choice, i) => 
            <div key={choice}>
                <input 
                    type="radio"
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

    return (
        <div className='MultipleChoice__container'>
            <QuestionDialogue page={page} savedUserInput={savedUserInput} />
            <form
                onSubmit={(e) => {
                    checkAnswer(e, userChoice);
                    setChoice();
                }}
            >
                <fieldset>
                    <QuestionLegend page={page} savedUserInput={savedUserInput} />
                    {choicesHTMLArray}
                </fieldset>
                <button 
                    type="submit"
                    disabled={!userChoice}
                >Submit</button>
            </form>
        </div>
    );
}

export default MultipleChoice;