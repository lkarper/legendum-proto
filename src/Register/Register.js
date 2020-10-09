import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthApiService from '../services/auth-api-service';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import './Register.css';

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
    const [apiError, setApiError] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [props]);

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
                setApiError('');
                props.history.push('/login');
            })
            .catch(res => {
                setApiError(res.error);
                console.log('error', res.error);
                window.scrollTo(0, document.querySelector('.Register__alert-div').offsetTop - document.querySelector('.Header__header').offsetHeight);
            });
    }

    return (
        <section className='Register__section'>
            <h2>Register</h2>
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
            <div 
                className='Register__alert-div'
                role='alert'
            >
                {apiError &&
                    <>
                        <h2>Error</h2>
                        <p>New user could not be created: {apiError}</p>
                        {apiError === 'Username already taken' && 
                            <p>The username '{userName}' is already linked to a registered account. If that account belongs to you, <Link to='/login'>click here</Link> to login.</p>
                        }
                    </> 
                }
            </div>
        </section>
    );
}

export default Register;
