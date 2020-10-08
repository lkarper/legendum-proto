import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './LoadingSpinner.css'; 

const LoadingSpinner = (props) => {
    return (
        <div className='LoadingSpinner__loading-container'>
            <FontAwesomeIcon 
                className='LoadingSpinner__spinner'
                icon={['fa', 'spinner']} 
                spin
            />
        </div>
    )
};

export default LoadingSpinner;