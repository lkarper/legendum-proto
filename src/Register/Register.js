import React, { useState } from 'react';
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

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
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
    );
}

export default Register;