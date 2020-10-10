import React from 'react';
import PropTypes from 'prop-types';
import ValidateUserName from '../ValidateUserName/ValidateUserName';
import ValidatePassword from '../ValidatePassword/ValidatePassword';
import ValidateReenterPassword from '../ValidateReenterPassword/ValidateReenterPassword';
import ValidateDisplayName from '../ValidateDisplayName/ValidateDisplayName';
import './RegistrationForm.css';

const RegistrationForm = (props) => {
    const {
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
    } = props;

    return (
        <form
            className='RegistrationForm__form'
            onSubmit={handleSubmit}
        >
            <div>
                <label
                    htmlFor='user-name'
                >
                    Username:
                </label>
                <input
                    type='text' 
                    id='user-name'
                    name='user-name'
                    autoComplete='username'
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    aria-describedby='username-required'
                    required
                />
            </div>
            <ValidateUserName 
                userName={userName} 
                setUserNameError={setUserNameError} 
                userNameError={userNameError} 
            />
            <div>
                <label
                    htmlFor='password'
                >
                    Password:
                </label>
                <input 
                    type='password'
                    id='password'
                    name='password'
                    autoComplete='new-password'
                    value={password}
                    aria-describedby='password-error-message'
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <ValidatePassword 
                password={password} 
                passwordErrorMessage={passwordErrorMessage}
                passwordError={passwordError}
                setPasswordErrorMessage={setPasswordErrorMessage}
                setPasswordError={setPasswordError}
            />
            <div>
                <label
                    htmlFor='reenter-password'
                >
                    Password:
                </label>
                <input 
                    type='password'
                    id='reenter-password'
                    name='reenter-password'
                    autoComplete='new-password'
                    aria-describedby='reenter-password-error'
                    value={reenterPassword}
                    onChange={(e) => setReenterPassword(e.target.value)}
                    required
                />
            </div>
            <ValidateReenterPassword 
                password={password} 
                reenterPassword={reenterPassword}
                reenterPasswordError={reenterPasswordError} 
                setReenterPasswordError={setReenterPasswordError}
            />
            <div>
                <label
                    htmlFor='display-name'
                >
                    Display name:
                </label>
                <input 
                    type='input'
                    id='display-name'
                    name='display-name'
                    value={displayName}
                    aria-describedby='display-name-required'
                    onChange={(e) => setDisplayName(e.target.value)}
                    required
                />
            </div>
            <ValidateDisplayName 
                displayName={displayName}
                displayNameError={displayNameError}
                setDisplayNameError={setDisplayNameError}
            />
            <button
                className='RegistrationForm__submit button'
                type='submit'
                disabled={
                    !!(userNameError || 
                    passwordErrorMessage.length || 
                    reenterPasswordError || 
                    displayNameError)
                }
            >
                Register
            </button>
        </form>
    );
}

RegistrationForm.defaultProps = {
    userName: '',
    password: '',
    reenterPassword: '',
    displayName: '',
    userNameError: '',
    passwordErrorMessage: [],
    reenterPasswordError: '',
    displayNameError: '',
    passwordError: {
        tooShort: true,
        tooLong: false,
        endSpaces: false,
        upperCase: true,
        lowerCase: true,
        number: true,
        specialChar: true,
    },
    setUserName: () => {},
    setPassword: () => {},
    setReenterPassword: () => {},
    setDisplayName: () => {},
    setUserNameError: () => {},
    setPasswordErrorMessage: () => {},
    setReenterPasswordError: () => {},
    setDisplayNameError: () => {},
    setPasswordError: () => {},
    handleSubmit: () => {},
};

RegistrationForm.propTypes = {
    userName: PropTypes.string,
    password: PropTypes.string,
    reenterPassword: PropTypes.string,
    displayName: PropTypes.string,
    userNameError: PropTypes.string,
    passwordErrorMessage: PropTypes.arrayOf(PropTypes.string),
    reenterPasswordError: PropTypes.string,
    displayNameError: PropTypes.string,
    passwordError: PropTypes.shape({
        tooShort: PropTypes.bool,
        tooLong: PropTypes.bool,
        endSpaces: PropTypes.bool,
        upperCase: PropTypes.bool,
        lowerCase: PropTypes.bool,
        number: PropTypes.bool,
        specialChar: PropTypes.bool,
    }),
    setUserName: PropTypes.func,
    setPassword: PropTypes.func,
    setReenterPassword: PropTypes.func,
    setDisplayName: PropTypes.func,
    setUserNameError: PropTypes.func,
    setPasswordErrorMessage: PropTypes.func,
    setReenterPasswordError: PropTypes.func,
    setDisplayNameError: PropTypes.func,
    setPasswordError: PropTypes.func,
    handleSubmit: PropTypes.func,
};

export default RegistrationForm;
