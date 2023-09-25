import React, { useEffect, useState } from 'react'
import './contact.css'
function Contact() {

    const [userData, setUserData] = useState({ name: '', email: '', phone: '', message: '' });

    const userContact = async () => {
        try {
            const res = await fetch('/getdata', {
                method: "GET",
                Headers: {
                    "Content-Type": "application/json"
                },
            });

            const data = await res.json();
            setUserData({ ...userData, name: data.name, email: data.email, phone: data.phone });

            if (!res.status === 200) {
                const err = new Error(res.error);
                throw err;
            }

        } catch (error) {
            console.log("no token history found");
            console.log(error);
        }
    }

    useEffect(() => {
        userContact();
    }, []);

    // storing data in states
    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUserData({ ...userData, [name]: value })
    }

    // data sending to backend
    const sendtobackend = async (e) => {
        e.preventDefault();
        const { name, email, phone, message } = userData;
        const res = await fetch('/contact', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, message
            })
        });

        const data = await res.json();

        if (!data) {
            console.log("message not send");
        }
        else {
            alert("Message Send");
            setUserData({ ...userData, message: "" })
        }
    }

    return (
        <div className='contactpage'>
            <div className='top-container'>
                <div className='top-fields'>
                    <i class="zmdi zmdi-phone" />
                    <div className='info'>
                        <h4>Phone</h4>
                        <p>+475-654-7899</p>
                    </div>
                </div>
                <div className='top-fields'>
                    <i class="zmdi zmdi-email" />
                    <div className='info'>
                        <h4>Email</h4>
                        <p>amanWaghmare@gmail.com</p>
                    </div>
                </div>
                <div className='top-fields'>
                    <i class="zmdi zmdi-pin"></i>
                    <div className='info'>
                        <h4>Address</h4>
                        <p>Pune,Mh India</p>
                    </div>
                </div>
            </div>
            <div className='bottom-container signup-container'>
                <h2 className='title'>GET in Touch</h2>
                <form className='inputs-tank'>
                    <input type="text" placeholder='Your Name' value={userData.name} name='name' onChange={handleInputs} />
                    <input type="text" placeholder='Your Email' value={userData.email} name='email' onChange={handleInputs} />
                    <input type="tel" placeholder='Your Phone Number' value={userData.phone} name='phone' onChange={handleInputs} />
                </form>
                <textarea className='messagebox' placeholder='Message' value={userData.message} name='message' onChange={handleInputs} id="" cols="30" rows="10">

                </textarea>
                <button onClick={sendtobackend} className='sendbtn singinbtn'>Send Message</button>
            </div>
        </div>
    )
}

export default Contact;