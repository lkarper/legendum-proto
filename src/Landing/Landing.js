import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TokenService from '../services/token-service';
import NextStory from '../NextStory/NextStory';
import './Landing.css';

const Landing = (props) => {
    return (
        <div className="Landing__container">
            <div className='Landing__image-container'>
                <div className="Landing__speech-bubble-container">
                    <div className="Landing__speech-bubble">
                        <p className='Landing__speech-text'>Welcome!</p>
                    </div>
                    <div aria-hidden='true' className='Landing__arrow-container'>
                        <div className='Landing__arrow left'></div>
                        <div className='Landing__arrow center'></div>
                        <div className='Landing__arrow right'></div>
                    </div>
                </div>
                <img
                    className='Landing__greeting-image' 
                    src='/images/enni.png'
                    alt='A friendly-looking, three-headed dog.'
                />
            </div>
            {!TokenService.hasAuthToken() ? 
                <div className='Landing__link-container'>
                    <Link
                        className='Landing__link'
                        to="/register"
                    >Register</Link>
                    <FontAwesomeIcon 
                        className='Landing__leaf' 
                        icon={['fab', 'pagelines']} 
                    />
                    <Link
                        className='Landing__link'
                        to="/game/story/1"
                    >Play without Registering</Link>
                    <FontAwesomeIcon 
                        className='Landing__leaf' 
                        icon={['fab', 'pagelines']} 
                    />
                    <Link
                        className='Landing__link'
                        to="/login"
                    >Login</Link>
                </div>
                : 
                <div className='Landing__link-container'>
                    <Link
                        className='Landing__link'
                        to='/dashboard'
                    >Go to Dashboard</Link>
                    <FontAwesomeIcon 
                        className='Landing__leaf' 
                        icon={['fab', 'pagelines']} 
                    />
                    <NextStory />
                </div>    
            }
        </div>
    )
}

export default Landing;