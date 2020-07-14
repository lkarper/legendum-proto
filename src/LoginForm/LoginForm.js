import React from 'react';

const LoginForm = (props) => {

    const { userName, password, setUserName, setPassword, handleLogin, error } = props;

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={(e) => handleLogin(e)}>
                <label htmlFor="user-name">Username:</label>
                <input
                    type="text"
                    id="user-name"
                    name="user-name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    autoComplete="username"
                    required 
                />
                <label htmlFor="password">Password:</label>
                <input 
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                />
                <div role='alert'>
                    {error && <p className='red'>{error}</p>}
                </div>
                <button
                    type="submit"
                    disabled={!userName || !password}
                >
                    Login
                </button>
            </form>            
        </div>
    );
}

export default LoginForm;