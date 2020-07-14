import React from 'react';
import { Route } from 'react-router-dom';
import Landing from '../Landing/Landing';
import Game from '../Game/Game';
import Register from '../Register/Register';
import LoginPage from '../LoginPage/LoginPage';

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
            <Route
                path="/login"
                component={LoginPage} 
            />
        </main>
    );
}

export default Main;