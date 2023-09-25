import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import signupimg from '../images/signupimg.jpg';
import './signup.css';



function Signup() {
    const navigate = useNavigate();

    const [user, setUser] = useState({ name: "", email: "", phone: "", work: "", password: "", cpassword: "" })

    let name, value;

    const handleInputs = (event) => {
        name = event.target.name;
        value = event.target.value;
        setUser({ ...user, [name]: value });
    }

    const PostData = async (e) => {
        e.preventDefault();

        const { name, email, phone, work, password, cpassword } = user;

        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                //passing values to backend
                // name: name no need to write if same names are used
                name, email, phone, work, password, cpassword
            })
        });
        const data = await res.json();

        if (data.status === 422 || !data) {
            window.alert("Invalid Registration..");
            console.log("invalid registration")
        }
        else {
            window.alert("Registration Succesful");
            console.log("registration succesful")
            navigate("/login");
        }
    }

    return (
        <div className='signup-container'>
            <div className='formpart'>
                <h2 className='title'>Sign up</h2>

                <form method='POST' className="register-form">
                    <div className='input-field'>
                        <label htmlFor="name" >
                            <i class="zmdi zmdi-account" />
                        </label>
                        <input type="text" name='name' autoComplete='off' value={user.name} onChange={handleInputs} placeholder='Your Name' />
                    </div>
                    <div className='input-field'>
                        <label htmlFor="email" >
                            <i class="zmdi zmdi-email" />
                        </label>
                        <input type="text" name='email' autoComplete='off' value={user.email} onChange={handleInputs} placeholder='Your Email' />
                    </div>
                    <div className='input-field'>
                        <label htmlFor="phone" >
                            <i class="zmdi zmdi-phone" />
                        </label>
                        <input type="tel" name='phone' autoComplete='off' value={user.phone} onChange={handleInputs} placeholder='Your Mobile' />
                    </div>
                    <div className='input-field'>
                        <label htmlFor="work" >
                            <i class="zmdi zmdi-collection-video"></i>
                        </label>
                        <input type="text" name='work' autoComplete='off' value={user.work} onChange={handleInputs} placeholder='Your Profession' />
                    </div>
                    <div className='input-field'>
                        <label htmlFor="password" >
                            <i class="zmdi zmdi-lock"></i>
                        </label>
                        <input type="password" name='password' autoComplete='off' value={user.password} onChange={handleInputs} placeholder='Your Password' />
                    </div>
                    <div className='input-field'>
                        <label htmlFor="cpassword" >
                            <i class="zmdi zmdi-lock-open"></i>
                        </label>
                        <input type="password" name='cpassword' autoComplete='off' value={user.cpassword} onChange={handleInputs} placeholder='Confirm Your Password' />
                    </div>

                    <button className='singupbtn' onClick={PostData}>Register</button>
                </form>

            </div>
            <div className='imgpart'>
                <img src={signupimg} alt="" />
                <NavLink to="/login" className="singuplink">I'am Already Registered</NavLink>
            </div>
        </div >
    )
}

export default Signup;