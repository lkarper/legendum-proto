import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import UserContext from '../contexts/UserContext';
import './NextStory.css';

const NextStory = (props) => {
    const context = useContext(UserContext);

    const exercises = [...context.exercises].sort((a, b) => a.chapter_number - b.chapter_number);

    const lastChapter = context.exercises.length !==0 
        ? [...context.exercises].sort((a, b) => b.chapter_number - a.chapter_number)[0].chapter_number 
        : undefined;

    let nextChapter;

    // Look for the first chapter that the user has not yet completed, and set it to be the next chapter
    if (context.progress.length !== 0) {
        for (const exercise of exercises) {
            if (context.progress.filter(p => p.chapter_number === exercise.chapter_number).length === 0) {
                nextChapter = exercise.chapter_number;
                break;
            }
        }
    }

    if (nextChapter) {
        return (
            <Link 
                className='NextStory__link button' 
                to={`/game/story/${nextChapter}`}
            >
                Pick up where you left off (chapter {nextChapter})
            </Link>
        );
    } else if (context.progress.length === 0) {
        return (
            <Link 
                className='NextStory__link button' 
                to={`/game/story/1`}
            >
                Start at Chapter 1
            </Link>
        );
    }
    
    return (
        <Link 
            className='NextStory__link button' 
            to={`/game/story/${lastChapter}`}
        >
            Visit the last chapter again
        </Link>
    );
}

export default NextStory;
