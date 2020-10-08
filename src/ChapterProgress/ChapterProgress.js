import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserContext from '../contexts/UserContext';
import './ChapterProgress.css';

const ChapterProgress = (props) => {
    const { exercise } = props;

    const context = useContext(UserContext);
    const timesCompleted = context.progress.filter(p => p.chapter_number === exercise.chapter_number).length;

    return (
        <li>
            <h4>{exercise.exercise_title}{' '}{exercise.exercise_translation}</h4>
            <p>You've completed this chapter {timesCompleted === 1 ? '1 time' : `${timesCompleted} times`}</p>
            {timesCompleted !== 0 && 
                <div> 
                    <h5>You completed this exercise on: </h5>
                    <ul>
                        {context.progress
                            .filter(p => p.chapter_number === exercise.chapter_number)
                            .map(p => 
                                <li 
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
                    className='Landing__leaf' 
                    icon={['fab', 'pagelines']} 
                />
                <Link 
                    className='ChapterProgress__link'
                    to={`/game/exercises/${exercise.chapter_number}/learn`}
                >
                    Learn this Exercise
                </Link>
                <FontAwesomeIcon 
                    className='Landing__leaf' 
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

export default ChapterProgress;