import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Story = (props) => {

    const { chapt } = props.match.params;

    const [dialogue, setDialogue] = useState([]);
    const [page, setPage] = useState(1);
    // const [choices, setChoices] = useState();
    const [response, setResponse] = useState();

    const fetchReponse = (choiceIndex) => {
        const { responses_to_choices } = dialogue[page - 1];
        const responsesArray = responses_to_choices.split("|");
        return (
            <p>{responsesArray[choiceIndex]}</p>
        );
    }

    const fetchChoices = () => {
        const { choices } = dialogue[page - 1];
        const choicesHTML = choices.split('|').map((choice, i) => <button key={i} onClick={() => setResponse(fetchReponse(i))}>{choice}</button>)
        return (
            <div>
                {choicesHTML}
            </div>
        );
    }

    const fetchPage = () => {
        let body;

        if (response) {
            body = (
                <div>
                    {response}
                    {page !== 1 ? 
                        <button 
                            onClick={() => {
                                setPage(page - 1);
                                setResponse(null);
                            }}
                        >&#60;</button> 
                        : ''}
                    {page !== dialogue.length ? 
                        <button 
                            onClick={() => {
                                setPage(page + 1);
                                setResponse(null)
                            }}
                        >&#62;</button> 
                        : ''}
                </div>
            )
        } else {
            body = (
                <div>
                    <p>{dialogue[page - 1].text}</p>
                    {dialogue[page - 1].choices ? fetchChoices() : ''}
                    {response || ''}
                    {page !== 1 ? <button onClick={() => setPage(page - 1)}>&#60;</button> : ''}
                    {page !== dialogue.length ? <button onClick={() => setPage(page + 1)}>&#62;</button> : ''}
                </div>
            );
        }
        return body;
    }

    useEffect(() => {
        fetch(`http://localhost:8000/api/dialogue/${chapt}`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error (res.statusText);
            })
            .then(data => {
                data.sort((a, b) => a.page - b.page);
                console.log(data);
                setDialogue(data);
            });
    }, [chapt]);

    return (
        <div>
            {dialogue.length ? <h2>{dialogue[0].story_title}</h2> : <p>Loading...</p>}
            {dialogue.length ? fetchPage() : ''}
            {dialogue.length && dialogue.length === page 
                ? <Link 
                    to={`/game/exercise/${chapt}`}
                >Begin Exercise</Link>
                : ''
            }
        </div>
    );
}

export default Story;