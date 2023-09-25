import React, { useState, useEffect } from 'react'
import './home.css'
function Home() {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');

    const userHomePage = async () => {
        try {
            const res = await fetch('/getdata', {
                method: "GET",
                Headers: {
                    "Content-Type": "application/json"
                },
            });

            const data = await res.json();
            setUserName(data.name);
            setEmail(data.email);

        } catch (error) {
            console.log("no token history found");
            console.log(error);
        }
    }

    useEffect(() => {
        userHomePage();
    }, []);


    return (
        <div className='homepage'>
            <div className='left'></div>
            <div className='right'></div>
            <div className='above'>
                <p>Welcome</p>
                <h2>{userName}</h2>
                <h3>We Are The Mern Developer</h3>
            </div>
        </div>
    )
}

export default Home