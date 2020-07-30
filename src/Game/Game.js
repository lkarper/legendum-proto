import React from 'react';
import { Route } from 'react-router-dom';
import Story from '../Story/Story';
import Exercise from '../Exercise/Exercise';
import NotesWidget from '../NotesWidget/NotesWidget';

const Game = (props) => {
    return (
        <>
            <Route 
                path="/game/story/:chapt"
                component={Story}
            />
            <Route 
                path="/game/exercises/:chapt"
                component={Exercise}
            />
            <Route 
                path={["/game/exercises/:chapt", "/game/story/:chapt"]}
                component={NotesWidget}
            />
        </>
    );
}

export default Game;