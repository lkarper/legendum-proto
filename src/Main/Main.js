import React from 'react';
import { Route } from 'react-router-dom';
import Landing from '../Landing/Landing';
import Game from '../Game/Game';
import Register from '../Register/Register';

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
            <Route
                path="/register"
                component={Register}
            />
        </main>
    );
}

export default Main;