import React, { useState } from 'react';
import AuthApiService from '../services/auth-api-service';
import RegistrationForm from '../RegistrationForm/RegistrationForm';

const Register = (props) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [reenterPassword, setReenterPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [userNameError, setUserNameError] = useState(null);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState([]);
    const [reenterPasswordError, setReenterPasswordError] = useState(null);
    const [displayNameError, setDisplayNameError] = useState(null);
    const [passwordError, setPasswordError] = useState({
        tooShort: true,
        tooLong: false,
        endSpaces: false,
        upperCase: true,
        lowerCase: true,
        number: true,
        specialChar: true,
    });
    const [apiError, setApiError] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        AuthApiService.postUser({
            user_name: userName,
            password,
            display_name: displayName
        })
            .then(user => {
                setUserName('');
                setPassword('');
                setDisplayName('');
                setApiError(null);
                props.history.push('/login');
            })
            .catch(res => {
                setApiError(res.error);
            });
    }

    return (
        <>
            <RegistrationForm 
                propsObject={{
                    userName,
                    password,
                    reenterPassword,
                    displayName,
                    userNameError,
                    passwordErrorMessage,
                    reenterPasswordError,
                    displayNameError,
                    passwordError,
                    setUserName,
                    setPassword,
                    setReenterPassword,
                    setDisplayName,
                    setUserNameError,
                    setPasswordErrorMessage,
                    setReenterPasswordError,
                    setDisplayNameError,
                    setPasswordError,
                    handleSubmit,
                }}
            />
            {apiError ? 
                <div role="alert"> 
                    <h2>Error</h2>
                    <p>New user could not be created: {apiError}</p>
                </div>
                : ''
            }
        </>
    );
}

export default Register;