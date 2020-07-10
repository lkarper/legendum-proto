import React from 'react';
import DialogueChoices from '../DialogueChoices/DialogueChoices';

const DialoguePage= (props) => {
    const {response, page, setPage, setResponse, dialogue } = props.data;

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
                {dialogue[page - 1].choices ? 
                    <DialogueChoices 
                        data={{
                            dialogue,
                            page,
                            setResponse
                        }}
                    /> : ''}
                {response || ''}
                {page !== 1 ? <button onClick={() => setPage(page - 1)}>&#60;</button> : ''}
                {page !== dialogue.length ? <button onClick={() => setPage(page + 1)}>&#62;</button> : ''}
            </div>
        );
    }
    return body;
}

export default DialoguePage;