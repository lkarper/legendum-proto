import React, { useState, useEffect } from 'react';
import DialoguePage from '../DialoguePage/DialoguePage';
import config from '../config';
import './Story.css';

const Story = (props) => {

    const { chapt } = props.match.params;

    const [dialogue, setDialogue] = useState([]);
    const [page, setPage] = useState(1);
    const [response, setResponse] = useState();    

    useEffect(() => {
        fetch(`${config.API_ENDPOINT}/dialogue/${chapt}`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error (res.statusText);
            })
            .then(data => {
                data.sort((a, b) => a.page - b.page);
                setDialogue(data);
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
                        <h2 className='Story__h2'>{dialogue[0].story_title}</h2>
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