import React, { useEffect, useState } from 'react';
import mypic from "../images/amanpic.jpg"
import './about.css'
import { useNavigate } from "react-router-dom";

function About() {

    const navigate = useNavigate();
    const [userData, setUserData] = useState({});

    const [activeSection, setActiveSection] = useState('aboutsection');

    const handleSecClick = (sectionId) => {
        setActiveSection(sectionId);
    }

    const callAboutPage = async () => {
        try {
            const res = await fetch('/about', {
                method: "GET",
                Headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();
            setUserData(data);

            if (res.status !== 200) {
                const err = new Error(res.error);
                throw err;
            }

        } catch (error) {
            console.log("no token history found");
            console.log(error);
            navigate('/login');
        }
    }

    useEffect(() => {
        callAboutPage();
    }, []);


    return (
        <div className='about-background'>
            <div className="top"></div>
            <div className="bottom"></div>

            <form method='GET' className='about-container signup-container'>
                <div className="leftside">
                    <img src={mypic} alt="" />
                    <p>Work links</p>
                    <div className="links">
                        <a target='_blank' href="https://www.linkedin.com/in/aman-waghmare-7329901aa/" rel="noreferrer"><i class="zmdi zmdi-linkedin-box"></i></a>
                        <a target='_blank' href="https://github.com/Amu757" rel="noreferrer"><i class="zmdi zmdi-github-box"></i></a>
                        <a target='_blank' href="https://youtube.com/@amanwaghmare5792" rel="noreferrer"><i class="zmdi zmdi-youtube-play"></i></a>
                    </div>
                </div>
                <div className="info">
                    <div className="info-top">
                        <h4>{userData.name}</h4>
                        <h6>{userData.work}</h6>
                        <p>Rankings: <strong><span>1/10</span></strong></p>
                        <button className='editbtn'>Edit Profile</button>
                    </div>
                    <div className="info-bottom" >
                        <div className="options-tab">
                            <h4 id='about' onClick={() => handleSecClick('aboutsection')}>About</h4>
                            <h4 id='timeline' onClick={() => handleSecClick('timelinesection')}>Timeline</h4>
                            <div className="line"></div>
                            <div className="color-line" style={{ left: activeSection === 'aboutsection' ? "0px" : "95px" }}></div>
                        </div>
                        <div className="bottom-infobox " id='aboutsection' style={{ display: activeSection === 'aboutsection' ? "flex" : "none" }}>
                            <div className="inforow">
                                <h6>User Id :</h6>
                                <p>{userData._id}</p>
                            </div>
                            <div className="inforow">
                                <h6>Name :</h6>
                                <p>{userData.name}</p>
                            </div>
                            <div className="inforow">
                                <h6>Email :</h6>
                                <p>{userData.email}</p>
                            </div>
                            <div className="inforow">
                                <h6>Phone :</h6>
                                <p>{userData.phone}</p>
                            </div>
                            <div className="inforow">
                                <h6>Profession :</h6>
                                <p>{userData.work}</p>
                            </div>
                        </div>
                        <div className="bottom-infobox" id='timelinesection' style={{ display: activeSection === 'timelinesection' ? "flex" : "none" }}>
                            <div className="inforow">
                                <h6>Experince :</h6>
                                <p>Expert</p>
                            </div>
                            <div className="inforow">
                                <h6>Hourly Rate :</h6>
                                <p>10$/hr</p>
                            </div>
                            <div className="inforow">
                                <h6>Total Projects :</h6>
                                <p>230</p>
                            </div>
                            <div className="inforow">
                                <h6>English Level :</h6>
                                <p>Expert</p>
                            </div>
                            <div className="inforow">
                                <h6>Avaibility :</h6>
                                <p>6 months</p>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default About;