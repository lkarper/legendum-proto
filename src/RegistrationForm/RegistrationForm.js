import React from 'react';
import ValidateUserName from '../ValidateUserName/ValidateUserName';
import ValidatePassword from '../ValidatePassword/ValidatePassword';
import ValidateReenterPassword from '../ValidateReenterPassword/ValidateReenterPassword';
import ValidateDisplayName from '../ValidateDisplayName/ValidateDisplayName';

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
    } = props.propsObject;

    return (
        <form
            onSubmit={(e) => handleSubmit(e)}
        >
            <div>
                <label
                    htmlFor="user-name"
                >
                    Username:
                </label>
                <input
                    type="text" 
                    id="user-name"
                    name="user-name"
                    autoComplete="username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    aria-describedby="username-required"
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
                    htmlFor="password"
                >
                    Password:
                </label>
                <input 
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="new-password"
                    value={password}
                    aria-describedby="password-error-message"
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
                    htmlFor="reenter-password"
                >
                    Password:
                </label>
                <input 
                    type="password"
                    id="reenter-password"
                    name="reenter-password"
                    autoComplete="new-password"
                    aria-describedby="reenter-password-error"
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
                    htmlFor="display-name"
                >
                    Display name:
                </label>
                <input 
                    type="input"
                    id="display-name"
                    name="display-name"
                    value={displayName}
                    aria-describedby="display-name-required"
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
                type="submit"
                disabled={!!(userNameError || passwordErrorMessage.length || reenterPasswordError || displayNameError)}
            >
                Register
            </button>
        </form>
    );
}

export default RegistrationForm;