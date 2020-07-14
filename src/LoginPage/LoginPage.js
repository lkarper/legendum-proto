import React, { useState } from 'react';
import AuthApiService from '../services/auth-api-service';
import TokenService from '../services/token-service';
import LoginForm from '../LoginForm/LoginForm';

const LoginPage = (props) => {

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const onLoginSuccess = () => {
        const { location, history } = props;
        const destination = (location.state || {}).from || '/';
        history.push(destination);
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