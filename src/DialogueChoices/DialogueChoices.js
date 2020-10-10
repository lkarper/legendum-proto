import React from 'react';
import PropTypes from 'prop-types';
import DialogueResponse from '../DialogueResponse/DialogueResponse';
import './DialogueChoices.css';

const DialogueChoices = (props) => {
    const {
        dialogue, 
        page, 
        setResponse, 
    } = props;

    const { choices } = dialogue[page - 1];

    const choicesHTML = choices
        .split('|')
        .map((choice, i) => 
            <button 
                className='DialogueChoices_choice-button button'
                key={i} 
                onClick={() => setResponse(
                    <DialogueResponse 
                        dialogue={dialogue}
                        page={page}
                        choiceIndex={i}
                    />
                )}
            >
                {choice}
            </button>
        );

    if (!choices) {
        return (
            <div className='DialogueChoices__container'>
                <p>Error: Looks like something went wrong. Check your connection and try again.</p>
            </div>
        );        
    }

    return (
        <div className='DialogueChoices__container'>
            {choicesHTML}
        </div>
    );
}

DialogueChoices.defaultProps = {
    dialogue: [{
        choices: '',
    }], 
    page: 1, 
    setResponse: () => {},    
};

DialogueChoices.propTypes = {
    dialogue: PropTypes.arrayOf(
        PropTypes.shape({
            choices: PropTypes.string, 
        }),
    ),
};

export default DialogueChoices;
