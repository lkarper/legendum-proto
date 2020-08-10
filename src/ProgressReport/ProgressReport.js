import React, { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import ChapterProgress from '../ChapterProgress/ChapterProgress';
import './ProgressReport.css';

const ProgressReport = (props) => {

    const context = useContext(UserContext);
    const { exercises } = context;

    return (
        <section className='ProgressReport__section'>
            <h3>User Progress</h3>
            <ol className='ProgressReport__ol'>
                {exercises
                    .sort((a, b) => a.id - b.id)
                    .map(exercise => <ChapterProgress key={exercise.id} exercise={exercise} />)
                }
            </ol>
        </section>
    )
}

export default ProgressReport;