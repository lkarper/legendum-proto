import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ExercisesService from '../services/exercises-service';
import LearnPage from '../LearnPage/LearnPage';

const Learn = (props) => {
    const { chapt } = props.match.params;

    const [pages, setPages] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        ExercisesService.getExercisesLearnByChapter(chapt)
            .then(data => {
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
            {page === pages.length ?
                <Link to={`/game/exercises/${chapt}/do`}>Practice What You've Learned</Link>
                : ''
            }
        </div>
    );
}

export default Learn;