import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DoPage from '../DoPage/DoPage';
import ExercisesService from '../services/exercises-service';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './Do.css';

const Do = (props) => {
    const { chapt } = props.match.params;

    const [pages, setPages] = useState([]);
    const [page, setPage] = useState(1);
    const [savedUserInput, setSavedUserInput] = useState({});
    const [showLoading, setShowLoading] = useState(false);
    const [apiError, setApiError] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);

        setShowLoading(true);
        setApiError(false);

        ExercisesService.getExercisesDoByChapter(chapt)
            .then(data => {
                data.sort((a, b) => a.page - b.page);
                setPages(data);
                setShowLoading(false);
            })
            .catch(error => {
                console.log('error', error);
                setApiError(true);
                setShowLoading(false);
                window.scrollTo(0, document.querySelector('.Do__alert-div').offsetTop - document.querySelector('.Header__header').offsetHeight);
            });
    }, [chapt]);

    return (
        <div className='Do__container'>
            {pages.length !==0 &&
                <DoPage
                    chapt={chapt}
                    savedUserInput={savedUserInput}
                    pages={pages}
                    page={page}
                    setPage={setPage}
                    setSavedUserInput={setSavedUserInput}
                />
            }
            {showLoading && <LoadingSpinner />}
            <div 
                className='Do__alert-div'
                role='alert'
            >
                {apiError &&
                    <p
                        className='Do__api-error'
                    >
                        Error: Looks like something went wrong. Check the url and your connection and try again.
                    </p>
                }
            </div>
        </div>
    );
}

Do.defaultProps = {
    match: {
        params: {
            chapt: '',
        },
    },
};

Do.propTypes = {
    match: PropTypes.object.isRequired,
}

export default Do;
