import React, { useState, useEffect } from 'react';
import ExercisesService from '../services/exercises-service';
import LearnPage from '../LearnPage/LearnPage';
import './Learn.css';

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
        <>
            {pages.length 
                ? 
                    <div className='Learn__container'>
                        <h2 className='Learn__h2'>{pages[0].exercise_title}</h2> 
                        <LearnPage
                            data={{
                                pages,
                                page,
                                chapt,
                                setPage,
                            }}
                        />
                    </div>
                : <p>Loading...</p>}
        </>
    );
}

export default Learn;