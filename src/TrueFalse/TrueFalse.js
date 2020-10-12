import React, { useState } from 'react';
import PropTypes from 'prop-types';
import QuestionDialogue from '../QuestionDialogue/QuestionDialogue';
import QuestionLegend from '../QuestionLegend/QuestionLegend';
import './TrueFalse.css';

const TrueFalse = (props) => {
    const { 
        page, 
        savedUserInput, 
        checkAnswer,
    } = props;

    const [userChoice, setChoice] = useState();

    if (Object.keys(page).length === 0) {
        return (
            <p>Error: Looks like something went wrong. Check your connection and try again.</p>
        );
    }

    return (
        <div className='TrueFalse__container'>
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
                    <div
                        className='TrueFalse__input-div'
                    >
                        <input 
                            className='TrueFalse__input radio'
                            type='radio'
                            id='true'
                            name='user-response'
                            value='True/Vērum'
                            checked={userChoice === 'True/Vērum'}
                            onChange={(e) => setChoice(e.target.value)}
                            required
                        />
                        <label htmlFor='true'>True/Vērum</label>
                    </div>
                    <div
                        className='TrueFalse__input-div'
                    >
                        <input 
                            className='TrueFalse__input radio'
                            type='radio'
                            id='false'
                            name='user-response'
                            value='False/Falsum'
                            checked={userChoice === 'False/Falsum'}
                            onChange={(e) => setChoice(e.target.value)}
                            required
                        />
                        <label htmlFor='false'>False/Falsum</label>
                    </div>
                </fieldset>
                <button
                    className='TrueFalse__submit button'
                    type='submit'
                    disabled={!userChoice}
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

TrueFalse.defaultProps = { 
    page: {}, 
    savedUserInput: {}, 
    checkAnswer: () => {},
};

TrueFalse.propTypes = { 
    page: PropTypes.object, 
    savedUserInput: PropTypes.object, 
    checkAnswer: PropTypes.func,
};

export default TrueFalse;
