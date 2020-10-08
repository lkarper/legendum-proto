import React, { useState, useEffect, useContext } from 'react';
import UserContext from './contexts/UserContext';
import IdleService from './services/idle-service';
import TokenService from './services/token-service';
import AuthApiService from './services/auth-api-service';
import Header from './Header/Header';
import Main from './Main/Main';
import './App.css';

const useForceUpdate = () => {
    const [value, setValue] = useState(0); 
    return () => setValue(value + 1); 
}

const App = (props) => {
    const context = useContext(UserContext);

    const forceUpdate = useForceUpdate();

    const logoutFromIdle = () => {
        // Removes data from local storage
        TokenService.clearAuthToken();
        
        // Clears the timeout function set to make an api call to the refresh endpoint
        TokenService.clearCallbackBeforeExpiry();

        // Removes the timeout that auto logs-out when idle and the event listeners that reset it
        IdleService.unRegisterIdleResets();

        // Resets context and rerenders the app after local storage has been cleared
        context.setNotes([]);
        context.setProgress([]);
        forceUpdate();
    }

    // Checks local storage for jwt on re-render and sets idle timeouts
    useEffect(() => {
        /* 
            Sets the callback that will be added to the timeout 
            that will logout a user due to inactivity 
        */
        IdleService.setIdleCallback(logoutFromIdle);

        // If a user is logged in
        if (TokenService.hasAuthToken()) {
          
            // Registers the event listeners that will reset the idle timeout
            IdleService.regiserIdleTimerResets();

            // Queues a callback that will fire just before the jwt in local storage expires
            TokenService.queueCallbackBeforeExpiry(() => {
                // Calls the api to send a new jwt
                AuthApiService.postRefreshToken();
            });
        }

        return function cleanup() {
            // Clear local storage and remove event listeners when App unmounts
            IdleService.unRegisterIdleResets();
            TokenService.clearCallbackBeforeExpiry();
        }
    });

    return (
        <div className="App">
            <Header forceUpdate={forceUpdate} />
            <Main forceUpdate={forceUpdate} />
        </div>
    );
}

export default App;
