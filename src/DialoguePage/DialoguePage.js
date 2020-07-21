import React from 'react';
import { Link } from 'react-router-dom';
import DialogueChoices from '../DialogueChoices/DialogueChoices';
import BackgroundImage from '../BackgroundImage/BackgroundImage';
import './DialoguePage.css';

const DialoguePage= (props) => {
    const {response, page, setPage, setResponse, dialogue, chapt } = props.data;
    const pageToDisplay = dialogue[page - 1];

    const image = pageToDisplay.image_url 
        ? 
            <BackgroundImage 
                classPrefix='DialoguePage'
                imgUrl={pageToDisplay.background_image_url}
                imageAltText={pageToDisplay.background_image_alt_text}
            >        
                <img 
                    className='DialoguePage__image'
                    src={pageToDisplay.image_url} 
                    alt={pageToDisplay.image_alt_text}
                /> 
            </BackgroundImage>
        : 
            '';

    let body;

    if (response) {
        body = (
            <div className='DialoguePage__container'>
                {image}
                <div className='DialoguePage__text-container'>
                    {response}
                    {dialogue.length && dialogue.length === page 
                        ? 
                            <Link
                                className='DialoguePage__begin-exercise-link' 
                                to={`/game/exercises/${chapt}/learn`}
                            >
                                Begin Exercise
                            </Link>
                        : 
                            ''
                    }
                    <div className='DialoguePage__button-container'>
                        <button 
                                className='DialoguePage__nav-button'
                                onClick={() => {
                                    setPage(page - 1);
                                    setResponse(null);
                                }}
                                disabled={page === 1}
                            >&#60;</button>
                        <button
                            className='DialoguePage__nav-button' 
                            onClick={() => {
                                setPage(page + 1);
                                setResponse(null)
                            }}
                            disabled={page === dialogue.length}
                        >&#62;</button>
                    </div>
                </div>
            </div>
        )
    } else {
        body = (
            <div className='DialoguePage__container'>
                {image}
                <div className='DialoguePage__text-container'>
                    <p className='DialoguePage__text'>{pageToDisplay.text}</p>
                    {pageToDisplay.choices ? 
                        <DialogueChoices 
                            data={{
                                dialogue,
                                page,
                                setResponse
                            }}
                        /> : ''
                    }
                    {dialogue.length && dialogue.length === page 
                        ? 
                            <Link
                                className='DialoguePage__begin-exercise-link' 
                                to={`/game/exercises/${chapt}/learn`}
                            >
                                Begin Exercise
                            </Link>
                        : 
                            ''
                    }
                    <div className='DialoguePage__button-container'>
                        <button
                                className='DialoguePage__nav-button' 
                                onClick={() => {
                                    setPage(page - 1);
                                    setResponse(null);
                                }}
                                disabled={page === 1}
                            >&#60;</button>
                        <button 
                                className='DialoguePage__nav-button'
                                onClick={() => {
                                setPage(page + 1);
                                setResponse(null)
                            }}
                            disabled={page === dialogue.length || pageToDisplay.choices}
                        >&#62;</button>
                    </div>
                </div>
            </div>
        );
    }
    return body;
}

export default DialoguePage;