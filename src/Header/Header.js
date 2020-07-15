import React from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../services/token-service';
import IdleService from '../services/idle-service';

const Header = (props) => {

    const { forceUpdate } = props;

    const handleLogout = () => {
        TokenService.clearAuthToken();
        TokenService.clearCallbackBeforeExpiry();
        IdleService.unRegisterIdleResets();
        forceUpdate();
    }

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
            <Link to='/login'>
                Log in
            </Link>
        </div>
    );

    return (
        <header>
            <nav>
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

export default Header;