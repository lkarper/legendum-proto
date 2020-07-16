import React, { useState, useContext } from 'react';
import UserContext from '../contexts/UserContext';
import NotesService from '../services/notes-service';
import AuthApiService from '../services/auth-api-service';
import LoginForm from '../LoginForm/LoginForm';

const LoginPage = (props) => {

    const context = useContext(UserContext);

    const { forceUpdate } = props;

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const onLoginSuccess = () => {
        const { location, history } = props;
        const destination = (location.state || {}).from || '/dashboard';
        NotesService.getNotesByUser()
            .then(notes => {
                context.setNotes(notes);
                forceUpdate();
                history.push(destination);
            })
            .catch(error => {
                context.setError(error);
            });

    }

    const handleLogin = (event) => {
        event.preventDefault();
        setError(null);
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
                setError(res.error);
            });
    }
 
    return (
        <LoginForm 
            userName={userName}
            password={password}
            setUserName={setUserName}
            setPassword={setPassword}
            handleLogin={handleLogin}
            error={error}
        />
    )

}

export default LoginPage;