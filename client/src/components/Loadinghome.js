import React from 'react';
import './LoadingAnimation.css';
import { height, width } from '@mui/system';

const Loadinghome = () => {
    return (
        <div className="loading-container" style={{ width: '100vw', height: '100vh' }}>
            <div className="loader">
                <div className="circle circle-1"></div>
                <div className="circle circle-2"></div>
                <div className="circle circle-3"></div>
            </div>
        </div>
    );
};

export default Loadinghome;
