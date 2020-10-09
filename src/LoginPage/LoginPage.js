import React, { useState, useContext } from 'react';
import UserContext from '../contexts/UserContext';
import NotesService from '../services/notes-service';
import ProgressService from '../services/progress-service';
import AuthApiService from '../services/auth-api-service';
import LoginForm from '../LoginForm/LoginForm';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const LoginPage = (props) => {
    const { 
        forceUpdate,
        location,
        history,
    } = props;

    const context = useContext(UserContext);

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [showLoading, setShowLoading] = useState(false);
    const [error, setError] = useState('');

    const onLoginSuccess = () => {
        const destination = (location.state || {}).from || '/dashboard';
        Promise.all([
            NotesService.getFetchNotesCallByUser(), 
            ProgressService.getFetchProgressCallForUser()
        ])
            .then(res => Promise.all(res.map(res => res.json())))
            .then(values => {
                const notes = values[0];
                const progress = values[1];
                context.setNotes(notes);
                context.setProgress(progress);
                forceUpdate();
                history.push(destination);
            })
            .catch(error => {
                setShowLoading(false);
                console.log('error', error);
                context.setError(error.message);
            });
    }

    const handleLogin = (event) => {
        event.preventDefault();
        setShowLoading(true);
        setError('');
        AuthApiService.postLogin({
            user_name: userName,
            password
        })
            .then(res => {
                setUserName('');
                setPassword('');
                onLoginSuccess();
            })
            .catch(res => {
                setShowLoading(false);
                setError(res.error);
            });
    }
 
    return (
        <>
            <LoginForm 
                userName={userName}
                password={password}
                setUserName={setUserName}
                setPassword={setPassword}
                handleLogin={handleLogin}
                error={error}
            />
            {showLoading && <LoadingSpinner />}
        </>
    );
}

export default LoginPage;
