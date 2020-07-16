import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

const ChapterProgress = (props) => {

    const context = useContext(UserContext);
    const { exercise } = props;

    const timesCompleted = context.progress.filter(p => p.exercise_id === exercise.id).length;

    return (
        <li>
            <h3>{exercise.exercise_title}{' '}{exercise.exercise_translation}</h3>
            <p>You've completed this chapter {timesCompleted === 1 ? '1 time' : `${timesCompleted} times`}</p>
            {timesCompleted ? 
                <div> 
                    <h4>You completed this exercise on: </h4>
                    <ul>
                        {context.progress
                            .filter(p => p.exercise_id === exercise.id)
                            .map(p => <li key={p.id}>{new Date(p.date_completed).toString()}</li>)
                        }
                    </ul>
                </div>
                : ''
            }
            <Link to={`/game/exercises/${exercise.id}/learn`}>Learn this Exercise</Link>
            <Link to={`/game/exercises/${exercise.id}/do`}>Practice this Exercise</Link>
        </li>
    );
}

export default ChapterProgress;