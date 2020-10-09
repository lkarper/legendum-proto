import React from 'react';
import { Route } from 'react-router-dom';
import PublicOnlyRoute from '../utils/PublicOnlyRoute';
import PrivateOnlyRoute from '../utils/PrivateOnlyRoute';
import Landing from '../Landing/Landing';
import Game from '../Game/Game';
import Register from '../Register/Register';
import LoginPage from '../LoginPage/LoginPage';
import Dashboard from '../Dashboard/Dashboard';
import './Main.css';

const Main = (props) => {
    const { forceUpdate } = props;

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
            <PublicOnlyRoute
                path="/register"
                component={Register}
            />
            <PublicOnlyRoute
                path="/login"
                render={rProps => <LoginPage {...rProps} forceUpdate={forceUpdate} />} 
            />
            <PrivateOnlyRoute 
                path="/dashboard"
                component={Dashboard}
            />
        </main>
    );
}

export default Main;
