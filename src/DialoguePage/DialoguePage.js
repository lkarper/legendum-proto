import React from 'react';
import DialogueChoices from '../DialogueChoices/DialogueChoices';

const DialoguePage= (props) => {
    const {response, page, setPage, setResponse, dialogue } = props.data;
    const page_to_display = dialogue[page - 1];

    const image = page_to_display.image_url 
        ? <img src={page_to_display.image_url} alt={page_to_display.image_alt_text}/> 
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
                <p>{page_to_display.text}</p>
                {page_to_display.choices ? 
                    <DialogueChoices 
                        data={{
                            dialogue,
                            page,
                            setResponse
                        }}
                    /> : ''}
                {response || ''}
                {page !== 1 ? <button onClick={() => setPage(page - 1)}>&#60;</button> : ''}
                {page !== dialogue.length && !page_to_display.choices ? <button onClick={() => setPage(page + 1)}>&#62;</button> : ''}
            </div>
        );
    }
    return body;
}

export default DialoguePage;