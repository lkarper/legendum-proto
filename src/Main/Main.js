import React from 'react';
import { Route } from 'react-router-dom';
import Landing from '../Landing/Landing';
import Game from '../Game/Game';

const Main = (props) => {
    return (
        <main>
            <Route 
                exact path="/"
                component={Landing}
            />
            <Route 
                path={["/game/story/:chapt", "/game/exercises/:chapt"]}
                component={Game}
            />
        </main>
    );
}

export default Main;