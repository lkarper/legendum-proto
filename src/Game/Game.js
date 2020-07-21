import React from 'react';
import { Route } from 'react-router-dom';
import Story from '../Story/Story';
import Exercise from '../Exercise/Exercise';

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
        </>
    );
}

export default Game;