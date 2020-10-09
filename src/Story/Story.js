import React, { useState, useEffect } from 'react';
import DialoguePage from '../DialoguePage/DialoguePage';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import config from '../config';
import './Story.css';

const Story = (props) => {
    const { chapt } = props.match.params;

    const [storyTitle, setStoryTitle] = useState('');
    const [dialogue, setDialogue] = useState([]);
    const [page, setPage] = useState(1);
    const [response, setResponse] = useState();
    const [showLoading, setShowLoading] = useState(false);
    const [apiError, setApiError] = useState(false);    

    useEffect(() => {
        window.scrollTo(0, 0);
        setShowLoading(true);
        fetch(`${config.API_ENDPOINT}/dialogue/by-chapter/${chapt}`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error (res.statusText);
            })
            .then(data => {
                setStoryTitle(data.story_title)
                const pages = data.pages.sort((a, b) => a.page - b.page);
                setDialogue(pages);
                setShowLoading(false);
                setApiError(false);
            })
            .catch(error => {
                setApiError(true);
                setShowLoading(false);
                window.scrollTo(0, document.querySelector('.Story__alert-div').offsetTop - document.querySelector('.Header__header').offsetHeight);
                console.log('error', error);
            });
    }, [chapt]);

    return (
        <div className='Story__container'>
            {dialogue.length !== 0 &&
                <>
                    <h2 className='Story__h2'>{storyTitle}</h2>
                    <DialoguePage 
                        data={{
                            response,
                            page,
                            setPage,
                            setResponse,
                            dialogue,
                            chapt,
                        }}
                    />
                </>
            }
            {showLoading && <LoadingSpinner />}
            <div
                className='Story__alert-div'
                role='alert'
            >
                {apiError && <p>Error: Looks like something went wrong. Check your connection and the url and try again.</p>}
            </div>
        </div>
    );
}

export default Story;
