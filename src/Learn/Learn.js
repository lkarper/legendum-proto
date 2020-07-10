import React, { useState, useEffect } from 'react';
import LearnPage from '../LearnPage/LearnPage';

const Learn = (props) => {
    const { chapt } = props.match.params;

    const [pages, setPages] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetch(`http://localhost:8000/api/exercises/${chapt}/learn`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error (res.statusText);
            })
            .then(data => {
                console.log(data);
                data.sort((a, b) => a.page - b.page);
                setPages(data);
            })
            .catch(error => {
                console.log('error', error);
            });
    }, [chapt]);

    return (
        <div>
            {pages.length ? < h2>{pages[0].exercise_title}</h2> : <p>Loading...</p>}
            {pages.length ? 
                <LearnPage
                    data={{
                        pages,
                        page,
                        setPage
                    }}
                />
                : ''
            }
        </div>
    );
}

export default Learn;