import React, { useState, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TokenService from '../services/token-service';
import ProgressService from '../services/progress-service';
import UserContext from '../contexts/UserContext';
import UserIncorrect from '../UserIncorrect/UserIncorrect';
import UserCorrect from '../UserCorrect/UserCorrect';
import QuestionToDisplay from '../QuestionToDisplay/QuestionToDisplay';

const DoPage = (props) => {

    const context = useContext(UserContext);

    const [userCorrect, setUserCorrect] = useState();
    const [userIncorrect, setUserIncorrect] = useState();
    const [error, setError] = useState(null);

    const { chapt, savedUserInput, pages, page, setPage, setSavedUserInput } = props.data;
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
        <div>
            <img 
                src={pageToDisplay.image_url}
                alt={pageToDisplay.image_alt_text}
            />
            <QuestionToDisplay 
                pageToDisplay={pageToDisplay}
                savedUserInput={savedUserInput}
                checkAnswer={checkAnswer}
            />
            {userIncorrect ? <UserIncorrect page={pageToDisplay} userResponse={userIncorrect} /> : ''}
            {userCorrect ? <UserCorrect page={pageToDisplay} userResponse={userCorrect} /> : ''}
            {page !== 1 ? 
                <button 
                    onClick={() => {
                        setUserCorrect();
                        setUserIncorrect();
                        setPage(page - 1);
                    }}
                >
                    &#60;
                </button> 
                : ''
            }
            {page !== pages.length && userCorrect ? 
                <button 
                    onClick={() => {
                        setUserCorrect();
                        setUserIncorrect();
                        setPage(page + 1);
                    }}
                >
                    &#62;
                </button> 
                : ''
            }
            <div role="alert">
                {page === pages.length && userCorrect
                    ? 
                        <>
                            {TokenService.hasAuthToken() 
                                ? <> 
                                    <button
                                        onClick={() => onCompletion(`/game/story/${parseInt(chapt) + 1}`)} 
                                    >
                                        On to the next chapter (progress will be saved)
                                    </button>
                                    <button
                                        onClick={() => onCompletion(`/dashboard`)} 
                                    >
                                        Back to the dashboard (progress will be saved)
                                    </button>
                                    <Link
                                        to='/dashboard'
                                    >Back to dashboard (do not save progress)</Link>
                                </>
                                : <Link to={`/game/story/${parseInt(chapt) + 1}`}>On the the next chapter</Link>
                            }
                            {/* Where else should the user be able to go? Some sort of home? A leaderboard? A group? */}
                        </> 
                    : ''
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
    );
}

export default withRouter(DoPage);