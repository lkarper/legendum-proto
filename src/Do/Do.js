import React, { useState, useEffect } from 'react';
import DoPage from '../DoPage/DoPage';
import ExercisesService from '../services/exercises-service';
import './Do.css';

const Do = (props) => {
    const { chapt } = props.match.params;

    const [pages, setPages] = useState([]);
    const [page, setPage] = useState(1);
    const [savedUserInput, setSavedUserInput] = useState({});

    useEffect(() => {
        ExercisesService.getExercisesDoByChapter(chapt)
            .then(data => {
                data.sort((a, b) => a.page - b.page);
                setPages(data);
            })
            .catch(error => {
                console.log('error', error);
            });
    }, [chapt]);

    return (
        <div className='Do__container'>
            {pages.length 
                ? 
                    <>
                        <h2
                            className='Do__h2'
                        >
                            {pages[0].exercise_title} {pages[0].exercise_translation}
                        </h2>
                        <DoPage
                            data={{
                                chapt,
                                savedUserInput,
                                pages,
                                page,
                                setPage,
                                setSavedUserInput,
                            }}
                        />
                    </>
                : 
                    <p>Loading...</p>
            }
        </div>
    );
}

export default Do;