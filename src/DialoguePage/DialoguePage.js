import React from 'react';
import DialogueChoices from '../DialogueChoices/DialogueChoices';

const DialoguePage= (props) => {
    const {response, page, setPage, setResponse, dialogue } = props.data;
    const pageToDisplay = dialogue[page - 1];

    const image = pageToDisplay.image_url 
        ? <img src={pageToDisplay.image_url} alt={pageToDisplay.image_alt_text}/> 
        : '';

    let body;

    if (response) {
        body = (
            <div>
                {image}
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
                {image}
                <p>{pageToDisplay.text}</p>
                {pageToDisplay.choices ? 
                    <DialogueChoices 
                        data={{
                            dialogue,
                            page,
                            setResponse
                        }}
                    /> : ''}
                {response || ''}
                {page !== 1 ? <button onClick={() => setPage(page - 1)}>&#60;</button> : ''}
                {page !== dialogue.length && !pageToDisplay.choices ? <button onClick={() => setPage(page + 1)}>&#62;</button> : ''}
            </div>
        );
    }
    return body;
}

export default DialoguePage;