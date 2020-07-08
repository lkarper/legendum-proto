import React, { useState, useEffect } from 'react';

const Story = (props) => {

    const { chapt } = props.match.params;

    const [dialogue, setDialogue] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8000/api/dialogue/${chapt}`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error (res.statusText);
            })
            .then(data => {
                console.log(data);
                setDialogue(data);
            });
    }, [chapt]);

    return (
        <div>

        </div>
    );
}

export default Story;