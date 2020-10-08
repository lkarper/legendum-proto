import React, { useState, useEffect } from 'react';
import DialoguePage from '../DialoguePage/DialoguePage';
import config from '../config';
import './Story.css';

const Story = (props) => {

    const { chapt } = props.match.params;

    const [storyTitle, setStoryTitle] = useState('');
    const [dialogue, setDialogue] = useState([]);
    const [page, setPage] = useState(1);
    const [response, setResponse] = useState();    

    useEffect(() => {
        window.scrollTo(0, 0);
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
            })
            .catch(error => {
                console.log('error', error);
            });
    }, [chapt]);

    return (
        <div className='Story__container'>
            {dialogue.length 
                ? 
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
                :
                    <>
                        <p className='Story__loading'>Loading...</p>
                    </>
            }
        </div>
    );
}

export default Story;