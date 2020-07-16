import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
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
        forceUpdate();
    }

    const location = Object.keys(props).includes('location') ? props.location.pathname : '/';

    const logoutLink = (
        <div>
            <Link
                onClick={handleLogout}
                to='/'
            >
                Logout
            </Link>
        </div>
    );

    const loginLink = (
        <div>
            <Link to='/register'>
                Register
            </Link>
            {' '}
            <Link 
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
                <h1>
                    <Link to='/'>
                        Legendum
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