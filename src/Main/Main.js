import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import PublicOnlyRoute from '../utils/PublicOnlyRoute';
import PrivateOnlyRoute from '../utils/PrivateOnlyRoute';
import Landing from '../Landing/Landing';
import Game from '../Game/Game';
import Register from '../Register/Register';
import LoginPage from '../LoginPage/LoginPage';
import Dashboard from '../Dashboard/Dashboard';
import PageNotFound from '../PageNotFound/PageNotFound';
import './Main.css';

const Main = (props) => {
    const { forceUpdate } = props;

    return (
        <main>
            <Switch>
                <Route 
                    exact path='/'
                    render={rProps => <Landing {...rProps} forceUpdate={forceUpdate} />} 
                />
                <Route 
                    path={['/game/story/:chapt', '/game/exercises/:chapt']}
                    component={Game}
                />
                <PublicOnlyRoute
                    path='/register'
                    component={Register}
                />
                <PublicOnlyRoute
                    path='/login'
                    render={rProps => <LoginPage {...rProps} forceUpdate={forceUpdate} />} 
                />
                <PrivateOnlyRoute 
                    path='/dashboard'
                    component={Dashboard}
                />
                <Route
                    component={PageNotFound}
                />
            </Switch>
        </main>
    );
}

Main.defaultProps = {
    forceUpdate: () => {},
};

Main.propTypes = {
    forceUpdate: PropTypes.func,
};

export default Main;
