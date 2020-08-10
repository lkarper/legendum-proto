import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TokenService from '../services/token-service';
import IdleService from '../services/idle-service';
import UserContext from '../contexts/UserContext';
import './Header.css';

const Header = (props) => {

    const context = useContext(UserContext);

    const { forceUpdate } = props;

    const handleLogout = () => {
        TokenService.clearAuthToken();
        TokenService.clearCallbackBeforeExpiry();
        IdleService.unRegisterIdleResets();
        context.setNotes([]);
        context.setProgress([]);
        forceUpdate();
    }

    const location = Object.keys(props).includes('location') ? props.location.pathname : '/dashboard';

    const logoutLink = (
        <div className="Header__links-container">
            <Link
                to='/dashboard'
                className='Header__link'
            >
                Dashboard
            </Link>
            <FontAwesomeIcon 
                className='Header__leaf' 
                icon={['fab', 'pagelines']} 
            />
            <Link
                className="Header__link"
                onClick={handleLogout}
                to='/'
            >
                Logout
            </Link>
        </div>
    );

    const loginLink = (
        <div className="Header__links-container">
            <Link 
                className="Header__link" 
                to='/register'
            >
                Register
            </Link>
            <FontAwesomeIcon 
                className='Header__leaf' 
                icon={['fab', 'pagelines']} 
            />
            <Link
                className="Header__link" 
                to={{
                    pathname: '/login',
                    state: { from: location || '/' }
                }}
            >
                Log in
            </Link>
        </div>
    );

    return (
        <header className="Header__header">
            <nav className="Header__nav">
                <h1 className="Header__h1">
                    <Link 
                        className='Header__home-link'
                        to='/'
                    >
                        LEGENDUM
                    </Link>
                </h1>
                {TokenService.hasAuthToken()
                    ? logoutLink
                    : loginLink
                }
            </nav>
        </header>
    );
}

export default withRouter(Header);