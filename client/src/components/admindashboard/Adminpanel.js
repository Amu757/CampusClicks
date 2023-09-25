import React, { useState } from 'react'
import Dashboard from "./Dashboard";
import Customers from "./Customers";
import { NavLink } from 'react-router-dom';
import './adminpanel.css';

function Adminpanel() {
    const [isActive, setIsActive] = useState(false);
    const [isActiveDashboard, setIsActiveDashboard] = useState(true);
    const [isActiveCustomer, setIsActiveCustomer] = useState(false);


    let list = document.querySelectorAll(".navigation li");

    function activeLink() {
        list.forEach((item) => {
            item.classList.remove("hovered");
        })
        this.classList.add("hovered");
    }

    list.forEach((item) => item.addEventListener("mouseover", activeLink))

    // menu toggle
    let toggle = document.querySelector(".toggle");
    let navigation = document.querySelector(".navigation");
    let main = document.querySelector(".main");

    const toggleMenu = () => {
        setIsActive(!isActive);
    };

    const activetab = (tabname) => {
        switch (tabname) {
            case "dashboard":
                setIsActiveDashboard(true);
                setIsActiveCustomer(false);
                break;
            case "customer":
                setIsActiveCustomer(true);
                setIsActiveDashboard(false);
                break;
            default:
                // logout
                console.log("nothing happend");
                break;
        }
    }




    return (
        <>
            {/* navigation  */}
            <div className={`container ${isActive ? 'active' : ''}`}>
                <div className="navigation">
                    <ul>
                        <li>
                            <a href="#">
                                <span className="icon">
                                    <ion-icon name="logo-apple" />
                                </span>
                                <span className="title">Brand Name</span>
                            </a>
                        </li>
                        <li onClick={() => activetab("dashboard")}>
                            <a href="#">
                                <span className="icon"><ion-icon name="home-outline" /></span>
                                <span className="title" >Dashboard</span>
                            </a>
                        </li>
                        <li onClick={() => activetab("customer")}>
                            <a href="#">
                                <span className="icon"><ion-icon name="people-outline" /></span>
                                <span className="title" >Customers</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span className="icon"><ion-icon name="chatbubble-outline" /></span>
                                <span className="title">Messages</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span className="icon"><ion-icon name="help-outline" /></span>
                                <span className="title">Help</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span className="icon"><ion-icon name="settings-outline" /></span>
                                <span className="title">Settings</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span className="icon"><ion-icon name="lock-closed-outline" /></span>
                                <span className="title">Password</span>
                            </a>
                        </li>
                        <li>
                            <NavLink to="/logout">
                                <span className="icon"><ion-icon name="log-out-outline" /></span>
                                <span className="title">Sign Out</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>

            {/* main  */}

            <div className={`main ${isActive ? 'active' : ''}`}>

                <div className="topbar">
                    <div className="toggle" onClick={toggleMenu}>
                        <ion-icon name="menu-outline" />
                    </div>
                    <div className="search">
                        <label>
                            <input type="text" placeholder="Search here" />
                            <ion-icon name="search-outline" />
                        </label>
                    </div>
                    <div className="user">
                        <img src={require("./imgs/costomer1.jpg")} alt="sry for img" />
                    </div>
                </div>


                {isActiveDashboard ? <Dashboard /> : <Customers />}



            </div>
        </>
    )
}

export default Adminpanel