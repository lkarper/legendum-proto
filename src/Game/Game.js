import React from 'react';
import { Route } from 'react-router-dom';
import Story from '../Story/Story';
import Exercise from '../Exercise/Exercise';

const Game = (props) => {
    return (
        <div>
            <Route 
                path="/game/story/:chapt"
                component={Story}
            />
            <Route 
                path="/game/exercise/:chapt"
                component={Exercise}
            />
        </div>
    );
}

export default Game;