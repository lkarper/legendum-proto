import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import UserContext from '../contexts/UserContext';
import './ChapterProgress.css';

const ChapterProgress = (props) => {
    const { exercise } = props;

    const context = useContext(UserContext);
    const timesCompleted = context.progress.filter(p => p.chapter_number === exercise.chapter_number).length;

    if (Object.keys(exercise).length === 0) {
        return (
            <li>
                <h4
                    className='ChapterProgress__h4'
                >
                    Error
                </h4>
                <p>Looks like something went wrong. Check your connection and try again.</p>
            </li>
        );
    }

    return (
        <li>
            <h4
                className='ChapterProgress__h4'
            >
                {exercise.exercise_title}{' '}{exercise.exercise_translation}
            </h4>
            <p
                className='ChapterProgress__p-times-completed'
            >
                You've completed this chapter {timesCompleted === 1 ? '1 time' : `${timesCompleted} times`}
            </p>
            {timesCompleted !== 0 && 
                <div> 
                    <h5
                        className='ChapterProgress__h5'
                    >
                        You completed this exercise on: 
                    </h5>
                    <ul>
                        {context.progress
                            .filter(p => p.chapter_number === exercise.chapter_number)
                            .map(p => 
                                <li 
                                    className='ChapterProgress__li-dates-completed'
                                    key={p.id}
                                >
                                    {moment(p.date_completed).format('MMM. Do YYYY, h:mm a')}
                                </li>
                            )
                        }
                    </ul>
                </div>
            }
            <div className='ChapterProgress__link-container'>
                <Link
                    className='ChapterProgress__link' 
                    to={`/game/story/${exercise.chapter_number}`}
                >
                    Pick up with this chapter's story
                </Link>
                <FontAwesomeIcon 
                    className='ChapterProgress__leaf' 
                    icon={['fab', 'pagelines']} 
                />
                <Link 
                    className='ChapterProgress__link'
                    to={`/game/exercises/${exercise.chapter_number}/learn`}
                >
                    Learn this Exercise
                </Link>
                <FontAwesomeIcon 
                    className='ChapterProgress__leaf' 
                    icon={['fab', 'pagelines']} 
                />
                <Link 
                    className='ChapterProgress__link'
                    to={`/game/exercises/${exercise.chapter_number}/do`}
                >
                    Practice this Exercise
                </Link>
            </div>
        </li>
    );
}

ChapterProgress.defaultProps = {
    exercise: {},
}

ChapterProgress.propTypes = {
    exercise: PropTypes.object.isRequired,
}

export default ChapterProgress;
