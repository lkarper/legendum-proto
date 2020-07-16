import React from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../services/token-service';
import NextStory from '../NextStory/NextStory';
import './Landing.css';

const Landing = (props) => {
    return (
        <div className="Landing__container">
            {!TokenService.hasAuthToken() ? 
                <>
                    <Link
                        to="/register"
                    >Register</Link>
                    <Link
                        to="/game/story/1"
                    >Play without Registering</Link>
                    <Link
                        to="/login"
                    >Login</Link>
                </>
                : 
                <>
                    <Link
                        to='/dashboard'
                    >Go to Dashboard</Link>
                    <NextStory />
                </>    
            }
        </div>
    )
}

export default Landing;