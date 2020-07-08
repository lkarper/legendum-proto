import React from 'react';
import { Link } from 'react-router-dom';

const Landing = (props) => {
    return (
        <div>
            <Link>Register</Link>
            <Link
                to="/game/story/1"
            >Play without Registering</Link>
        </div>
    )
}

export default Landing;