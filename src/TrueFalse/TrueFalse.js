import React, { useState } from 'react';
import QuestionDialogue from '../QuestionDialogue/QuestionDialogue';
import QuestionLegend from '../QuestionLegend/QuestionLegend';
import './TrueFalse.css';

const TrueFalse = (props) => {

    const [userChoice, setChoice] = useState();

    const { page, savedUserInput, checkAnswer } = props;

    return (
        <div className='TrueFalse__container'>
            <QuestionDialogue page={page} savedUserInput={savedUserInput} />
            <form
                onSubmit={(e) => {
                    checkAnswer(e, userChoice);
                    setChoice();
                }}
            >
                <fieldset>
                    <QuestionLegend page={page} savedUserInput={savedUserInput} />
                    <div>
                        <input 
                            type="radio"
                            id="true"
                            name="user-response"
                            value="True/Vērum"
                            checked={userChoice === 'True/Vērum'}
                            onChange={(e) => setChoice(e.target.value)}
                            required
                        />
                        <label htmlFor="true">True/Vērum</label>
                    </div>
                    <div>
                        <input 
                            type="radio"
                            id="false"
                            name="user-response"
                            value="False/Falsum"
                            checked={userChoice === 'False/Falsum'}
                            onChange={(e) => setChoice(e.target.value)}
                            required
                        />
                        <label htmlFor="false">False/Falsum</label>
                    </div>
                </fieldset>
                <button
                    className='TrueFalse__submit button'
                    type="submit"
                    disabled={!userChoice}
                >
                    Submit
                </button>
            </form>

        </div>
    );
}

export default TrueFalse;