import React, { useState, useEffect } from 'react';
import ExercisesService from '../services/exercises-service';
import LearnPage from '../LearnPage/LearnPage';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './Learn.css';

const Learn = (props) => {
    const { chapt } = props.match.params;

    const [pages, setPages] = useState([]);
    const [page, setPage] = useState(1);
    const [showLoading, setShowLoading] = useState(false);
    const [apiError, setApiError] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        setShowLoading(true);
        ExercisesService.getExercisesLearnByChapter(chapt)
            .then(data => {
                setApiError(false);
                data.sort((a, b) => a.page - b.page);
                setPages(data);
                setShowLoading(false);
            })
            .catch(error => {
                setApiError(true);
                setShowLoading(false);
                window.scrollTo(0, document.querySelector('.Learn__alert-div').offsetTop - document.querySelector('.Header__header').offsetHeight);
                console.log('error', error);
            });
    }, [chapt]);

    return (
        <>
            {pages.length !== 0 && 
                <div className='Learn__container'>
                    <LearnPage
                        data={{
                            pages,
                            page,
                            chapt,
                            setPage,
                        }}
                    />
                </div>
            }
            {showLoading && <LoadingSpinner />}
            <div
                className='Learn__alert-div'
                role='alert'
            >
                {apiError && <p>Error: Looks like something went wrong. Check the url and your connection and try again.</p>}
            </div>
        </>
    );
}

export default Learn;
