import React from 'react'
import './errorpage.css'
import { NavLink } from 'react-router-dom'
function Errorpage() {
    return (
        <div className="notfound">
            <h1 className='background'>404</h1>
            <h2>We are sorry, Page not Found !</h2>
            <p>
                The page you are looking for might have been removed
                had its name changed or its temperarily unavailable.
            </p>
            <NavLink to="/" /><span className='errbtn'>Back to Homepage</span>
        </div>

    )
}

export default Errorpage