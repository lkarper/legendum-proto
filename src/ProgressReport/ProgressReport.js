import React, { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import ChapterProgress from '../ChapterProgress/ChapterProgress';

const ProgressReport = (props) => {

    const context = useContext(UserContext);
    const { exercises } = context;

    return (
        <div>
            <h2>User Progress</h2>
            <ol>
                {exercises
                    .sort((a, b) => a.id - b.id)
                    .map(exercise => <ChapterProgress key={exercise.id} exercise={exercise} />)
                }
            </ol>
        </div>
    )
}

export default ProgressReport;