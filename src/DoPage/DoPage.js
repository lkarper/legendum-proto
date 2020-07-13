import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserIncorrect from '../UserIncorrect/UserIncorrect';
import UserCorrect from '../UserCorrect/UserCorrect';
import QuestionToDisplay from '../QuestionToDisplay/QuestionToDisplay';

const DoPage = (props) => {

    const [userCorrect, setUserCorrect] = useState();
    const [userIncorrect, setUserIncorrect] = useState();

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
            {page === pages.length && userCorrect
                ? 
                    <>
                        <Link to={`/game/story/${parseInt(chapt) + 1}`}>On the the next chapter</Link>
                        {/* Where else should the user be able to go? Some sort of home? A leaderboard? A group? */}
                    </> 
                : ''
            }
        </div>
    );
}

export default DoPage;