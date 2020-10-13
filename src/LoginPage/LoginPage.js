import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import UserContext from '../contexts/UserContext';
import NotesService from '../services/notes-service';
import ProgressService from '../services/progress-service';
import AuthApiService from '../services/auth-api-service';
import LoginForm from '../LoginForm/LoginForm';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './LoginPage.css';

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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [props]);

    const onLoginSuccess = (demo) => {
        const destination = demo 
            ? '/dashboard'
            : (location.state || {}).from || '/dashboard';
        Promise.all([
            NotesService.getFetchNotesCallByUser(), 
            ProgressService.getFetchProgressCallForUser()
        ])
            .then(res => Promise.all(res.map(res => res.json())))
            .then(values => {
                context.setError(false);
                const notes = values[0];
                const progress = values[1];
                context.setNotes(notes);
                context.setProgress(progress);
                forceUpdate();
                history.push(destination);
            })
            .catch(error => {
                setShowLoading(false);
                context.setError(true);
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
                setError('');
                setUserName('');
                setPassword('');
                onLoginSuccess(false);
            })
            .catch(res => {
                setShowLoading(false);
                setError(res.error);
            });
    }

    const demoLogin = () => {
        setShowLoading(true);
        setError('');
        AuthApiService.postLogin({
            user_name: 'demoUser',
            password: 'DemoPassword123!'
        })
            .then(res => {
                setError('');
                setUserName('');
                setPassword('');
                onLoginSuccess(true);
            })
            .catch(res => {
                setShowLoading(false);
                setError(res.error);
            });
    }
 
    return (
        <section
            className='LoginPage__section'
        >
            <h2 className='LoginPage__h2'>Log in</h2>
            <LoginForm 
                userName={userName}
                password={password}
                setUserName={setUserName}
                setPassword={setPassword}
                handleLogin={handleLogin}
                error={error}
            />
            <section 
                className='LoginPage__section'
            >
                <h3>Want to try all of the features without creating an account?</h3>
                <p>Try out Legendum by using a demo account before creating an account of your own.</p>
                <button
                    className='LoginPage__demo button'
                    type='button'
                    onClick={demoLogin}
                >
                    Try Legendum with a demo account
                </button>
            </section>
            {showLoading && <LoadingSpinner />}
        </section>
    );
}

LoginPage.defaultProps = { 
    forceUpdate: () => {},
    location: {
        state: {
            from: '/dashboard',
        },
    },
    history: {
        push: () => {},
    },
};

LoginPage.propTypes = { 
    forceUpdate: PropTypes.func,
    location: PropTypes.shape({
        state: PropTypes.shape({
            from: PropTypes.string,
        }),
    }),
    history: PropTypes.shape({
        history: PropTypes.func,
    }),
};

export default LoginPage;
