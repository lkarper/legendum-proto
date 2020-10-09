import React, { useState, useEffect } from 'react';
import QuestionDialogue from '../QuestionDialogue/QuestionDialogue';
import QuestionLegend from '../QuestionLegend/QuestionLegend';
import './Input.css';

const Input = (props) => {
    const { 
        page, 
        savedUserInput, 
        checkAnswer, 
    } = props;

    const { question } = page;

    const [userInput, setUserInput] = useState('');
    const [formError, setFormError] = useState('Please type your answer and be sure to include at least one letter.');

    useEffect(() => {
        const regex = /^[a-zA-z[a-zA-z\s]*$/;
        if (!regex.test(userInput)) {
            setFormError('Please type your answer and be sure to include only letters or spaces in your response.');
        } else if (userInput.length && userInput.trim().length === 0) {
            setFormError('Please type your answer and be sure to include at least one letter.');
        } else {
            setFormError('');
        }
    }, [userInput]);

    useEffect(() => {
        setUserInput('');
    }, [question]);

    return (
        <div className='Input__container'>
            <QuestionDialogue 
                page={page} 
                savedUserInput={savedUserInput} 
            />
            <form 
                onSubmit={(e) => checkAnswer(e, userInput)
            }>
                <fieldset>
                    <QuestionLegend 
                        page={page} 
                        savedUserInput={savedUserInput} 
                    />
                    <label htmlFor="user-response">{page.input_label}</label>
                    <input 
                        type="text"
                        id="user-response"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        aria-describedby="input-error"
                        required
                    />
                    <div role='alert'>
                        <p id="input-error">{formError || 'Answer properly formatted'}</p>
                    </div>
                </fieldset>
                <button
                    className='Input__submit button' 
                    type="submit"
                    disabled={formError || !userInput}
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Input;
