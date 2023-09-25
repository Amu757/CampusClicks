import React, { useContext } from 'react'
import './Navbar.css';
import Logo from '../images/logo.jpg';
import { NavLink } from 'react-router-dom';

import { UserContext } from '../App';

function Navbar() {

    const { state, dispatch } = useContext(UserContext);


    const RenderMenu = () => {
        if (state) { // if true login
            return (
                <div className='list-container'>
                    <ul className="nav-list">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact">Contact</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/logout">Logout</NavLink>
                        </li>
                    </ul>
                </div>
            )
        }
        else {
            return (
                <div className='list-container'>
                    <ul className="nav-list">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact">Contact</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/login">Login</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/signup">Registration</NavLink>
                        </li>
                    </ul>
                </div>
            )
        }
    }
    return (
        <>
            <nav className="navbar">
                <div className="container-fluid">
                    <a className="navbar-logo" href="/">
                        <img src={Logo} alt="" />
                    </a>
                    <RenderMenu />
                </div>
            </nav>
        </>
    )
}

export default Navbar