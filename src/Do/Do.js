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
        window.scrollTo(0, 0);
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
                    <p className='Do__loading'>Loading...</p>
            }
        </div>
    );
}

export default Do;