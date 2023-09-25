import React, { useContext, useState, useEffect } from 'react'
import signinimg from '../images/signinimg.jpg'
import { NavLink, useNavigate } from 'react-router-dom';
import './signin.css'

import { UserContext } from '../App';

function Login() {
    const navigate = useNavigate();
    const { state, dispatch } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isAdminLogin, setIsAdminLogin] = useState(false);

    // Use useEffect to log the updated state
    useEffect(() => {
        console.log('Updated state:', state);
    }, [state]);


    const checkboxinput = (e) => {
        setIsAdminLogin(e.target.checked);
    }
    const loginUser = async (e) => {
        e.preventDefault();
        // decide in backend where to send data
        const res = await fetch("/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password, isAdminLogin })
        });

        const data = res.json();

        if (res.status === 400 || !data) {
            window.alert("Invalid Credentials");
        } else if (isAdminLogin) {
            console.log("userdata: ", data);
            // dispatch({ type: "USER", payload: true })
            window.alert("Login Succesful");
            navigate("/admin");
            console.log("navigate to home");
        }
        else {
            console.log("userdata: ", data);
            dispatch({ type: "USER", payload: true })
            window.alert("Login Succesful");
            navigate("/");
            console.log("navigate to adminpanel");
        }
    }



    return (
        <div className='signin-container'>
            <div className='imgpart'>
                <img src={signinimg} alt="" />
                <NavLink to="/signup" className="singinlink">Create an Account</NavLink>
            </div>
            <div className='formpart'>
                <h2 className='title'>Sign in</h2>

                <form method='POST' className="register-form">
                    <div className='input-field_'>
                        <label htmlFor="email" >
                            <i class="zmdi zmdi-email" />
                        </label>
                        <input type="text" placeholder='Your Email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    </div>
                    <div className='input-field_'>
                        <label htmlFor="password" >
                            <i class="zmdi zmdi-lock"></i>
                        </label>
                        <input type="password" placeholder='Your Password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                    <button className='singinbtn' onClick={loginUser}>Login</button>
                    <label className="lbl">Admin login</label>
                    <input type="checkbox" value="" onClick={checkboxinput} />
                </form>
            </div>

        </div >
    )
}

export default Login;