import React from 'react';
import PropTypes from 'prop-types';
import './LoginForm.css';

const LoginForm = (props) => {
    const { 
        userName, 
        password, 
        setUserName, 
        setPassword, 
        handleLogin, 
        error, 
    } = props;

    return (
        <form 
            className='LoginForm__form'
            onSubmit={handleLogin}
        >
            <div className='LoginForm__input-label-container'>
                <label htmlFor='user-name'>Username:</label>
                <input
                    type='text'
                    id='user-name'
                    name='user-name'
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    autoComplete='username'
                    required 
                />
            </div>
            <div className='LoginForm__input-label-container'>
                <label htmlFor='password'>Password:</label>
                <input 
                    type='password'
                    id='password'
                    name='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete='current-password'
                    required
                />
            </div>
            <div 
                className='LoginForm__error-container'
                role='alert'
            >
                {error && <p className='LoginForm__error'>{error}</p>}
            </div>
            <button
                className='LoginForm__submit button'
                type='submit'
                disabled={!userName || !password}
            >
                Login
            </button>
        </form>            
    );
}

LoginForm.defaultProps = { 
    userName: '', 
    password: '', 
    setUserName: () => {}, 
    setPassword: () => {}, 
    handleLogin: () => {}, 
    error: '', 
};

LoginForm.propTypes = { 
    userName: PropTypes.string, 
    password: PropTypes.string, 
    setUserName: PropTypes.func, 
    setPassword: PropTypes.func, 
    handleLogin: PropTypes.func, 
    error: PropTypes.string, 
};

export default LoginForm;
