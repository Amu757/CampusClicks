import React from 'react';
import './LoadingAnimation.css';

const LoadingAnimations = () => {
    return (
        <div className="loading-container">
            <div className="loader">
                <div className="circle circle-1"></div>
                <div className="circle circle-2"></div>
                <div className="circle circle-3"></div>
            </div>
        </div>
    );
};

export default LoadingAnimations;
