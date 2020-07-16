import React, { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import ChapterProgress from '../ChapterProgress/ChapterProgress';

const ProgressReport = (props) => {

    const context = useContext(UserContext);
    const { progress, exercises } = context;

    return (
        <div>
            <h2>User Progress</h2>
            <ol>
                {exercises.map(exercise => <ChapterProgress key={exercise.id} exercise={exercise} />)}
            </ol>
        </div>
    )
}

export default ProgressReport;