import React, { useState, useEffect } from 'react';
import QuestionDialogue from '../QuestionDialogue/QuestionDialogue';
import QuestionLegend from '../QuestionLegend/QuestionLegend';

const Input = (props) => {

    const [userInput, setUserInput] = useState();
    const [formError, setFormError] = useState(null);

    useEffect(() => {
        const regex = /^[a-zA-z[a-zA-z\s]*$/;
        if (!regex.test(userInput)) {
            setFormError('Please type your answer and be sure to include only letters or spaces in your response.')
        } else {
            setFormError(null);
        }
    }, [userInput])

    const { page, savedUserInput, checkAnswer } = props;

    return (
        <div>
            <QuestionDialogue page={page} savedUserInput={savedUserInput} />
            <form onSubmit={(e) => checkAnswer(e, userInput)}>
                <fieldset>
                    <QuestionLegend page={page} savedUserInput={savedUserInput} />
                    <label htmlFor="user-response">{page.input_label}</label>
                    <input 
                        type="text"
                        id="user-response"
                        onChange={(e) => setUserInput(e.target.value)}
                        aria-describedby="input-error"
                        required
                    />
                    {formError ? <p id="input-error">{formError}</p> : ''}
                    <button 
                        type="submit"
                        disabled={formError || !userInput}
                    >Submit</button>
                </fieldset>
            </form>
        </div>
    );
}

export default Input;