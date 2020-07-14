import React from 'react';
import { Link } from 'react-router-dom';

const Landing = (props) => {
    return (
        <div>
            <Link
                to="/register"
            >Register</Link>
            <Link
                to="/game/story/1"
            >Play without Registering</Link>
            <Link
                to="/login"
            >Login</Link>
        </div>
    )
}

export default Landing;