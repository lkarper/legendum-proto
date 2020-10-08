import React, { useState, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TokenService from '../services/token-service';
import ProgressService from '../services/progress-service';
import UserContext from '../contexts/UserContext';
import UserIncorrect from '../UserIncorrect/UserIncorrect';
import UserCorrect from '../UserCorrect/UserCorrect';
import QuestionToDisplay from '../QuestionToDisplay/QuestionToDisplay';
import BackgroundImage from '../BackgroundImage/BackgroundImage';
import './DoPage.css';

const DoPage = (props) => {
    const { 
        chapt, 
        savedUserInput, 
        pages, 
        page, 
        setPage, 
        setSavedUserInput,
    } = props.data;

    const context = useContext(UserContext);

    const [userCorrect, setUserCorrect] = useState();
    const [userIncorrect, setUserIncorrect] = useState();
    const [endQuiz, setEndQuiz] = useState(false);
    const [error, setError] = useState(null);

    const pageToDisplay = pages[page - 1];

    const checkAnswer = (event, userResponse) => {
        event.preventDefault();
        if (pageToDisplay.look_ahead) {
            setSavedUserInput({
                ...savedUserInput,
                [pageToDisplay.property_to_save]: userResponse,
            });
            setUserIncorrect();
            setUserCorrect(userResponse);
        } else if (userResponse === pageToDisplay.correct_response) {
            setUserIncorrect();
            setUserCorrect(userResponse);
        } else {
            setUserCorrect();
            setUserIncorrect(userResponse);
        }
    }

    const onCompletion = (url) => {
        if (TokenService.hasAuthToken()) {
            ProgressService.postProgress(chapt)
                .then(progressObject => {
                    setError(null);
                    context.updateProgress(progressObject);
                    props.history.push(url);
                })
                .catch(error => {
                    setError(error.message);
                });
        }
    }

    return (
<div className='DoPage__container'>
            <h2
                className='DoPage__h2'
            >
                {pageToDisplay.exercise_title}{' '}{pageToDisplay.exercise_translation}
            </h2>
            <BackgroundImage
                classPrefix='DoPage'
                imgUrl={pageToDisplay.background_image_url}
                imageAltText={pageToDisplay.background_image_alt_text}
            >
                <img
                    className='DoPage__image' 
                    src={pageToDisplay.image_url}
                    alt={pageToDisplay.image_alt_text}
                />
            </BackgroundImage>
            <div className={`DoPage__text-container${endQuiz ? '-end' : '' }`}>
                {!endQuiz 
                    ?
                        <>
                            <QuestionToDisplay 
                                pageToDisplay={pageToDisplay}
                                savedUserInput={savedUserInput}
                                checkAnswer={checkAnswer}
                            />
                            <div 
                                role='alert' 
                                className='DoPage__check-answer-container'
                            >
                                {userIncorrect && <UserIncorrect page={pageToDisplay} userResponse={userIncorrect} />}
                                {userCorrect && <UserCorrect page={pageToDisplay} userResponse={userCorrect} />}
                            </div>
                        </>
                    : ''
                }
                <div className='DoPage__button-container'>
                    <button
                        className='DoPage__nav-button button'
                        disabled={page === 1} 
                        onClick={() => {
                            setUserCorrect();
                            setUserIncorrect();
                            if (endQuiz) {
                                setEndQuiz(false);
                            } else {
                                setPage(page - 1);
                            }
                        }}
                    >
                        &#60;
                    </button>
                    <button 
                        className='DoPage__nav-button button'
                        disabled={!userCorrect}
                        onClick={() => {
                            setUserCorrect();
                            setUserIncorrect();
                            if (page !== pages.length) {
                                setPage(page + 1);
                            } else {
                                setEndQuiz(true);
                            }
                        }}
                    >
                        &#62;
                    </button>
                </div>
                <div role="alert" className='DoPage__end-quiz-container'>
                    {endQuiz && 
                        <>
                            {TokenService.hasAuthToken()
                                ? 
                                    <> 
                                        {parseInt(chapt) !== context.exercises.length 
                                            ?
                                                <button
                                                    className='button'
                                                    onClick={() => onCompletion(`/game/story/${parseInt(chapt) + 1}`)} 
                                                >
                                                    On to the next chapter (progress will be saved)
                                                </button>
                                            :
                                                <p>To be continued...check back soon!</p>
                                        }
                                        <button
                                            className='button'
                                            onClick={() => onCompletion(`/dashboard`)} 
                                        >
                                            Back to the dashboard (progress will be saved)
                                        </button>
                                        <Link
                                            className='DoPage__link button'
                                            to='/dashboard'
                                        >
                                            Back to dashboard (do not save progress)
                                        </Link>
                                    </>
                                : 
                                    parseInt(chapt) !== context.exercises.length 
                                        ?
                                            <Link 
                                                className='DoPage__link button' 
                                                to={`/game/story/${parseInt(chapt) + 1}`}
                                            >
                                                On the the next chapter
                                            </Link>
                                        :
                                            <p>To be continued...check back soon!</p>
                            }
                        </> 
                    }
                    {error ? 
                        <>
                            <h2>Could not save progress: {error} </h2>
                            <p>Check your connection then click one of the options above to try again.</p>
                        </>
                        : ''
                    }
                </div>
            </div>
        </div>
    );
}
                    
export default withRouter(DoPage);