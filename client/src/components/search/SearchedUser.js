import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { Avatar } from "@mui/material";
import "./searchedUser.css";
import Profile from '../Profile';
import { useNavigate } from "react-router-dom";


function SearchedUser(props) {
    const navigate = useNavigate();
    const user = props.User;
    const [showProfile, setShowProfile] = useState(false);

    const handleclick = () => {
        // navigate("/profile")
        props.setOtherUserData(user);
        props.setcalledfrom(props.calledfrom);
        props.setShowProfile(true);
        setShowProfile(true);
        props.setRecieverSelected(true);

        if (props.setaddresize !== undefined) {
            props.setaddresize(true);
            console.log("should work")
        }
        // if (props.showNewMessage !== undefined) {
        // props.setShowNewMessage(false);
        // }
    }

    const closemodal = () => {
        console.log('closing modal',)
    }

    return (
        <div className='container_'>
            {showProfile ? <Profile userData={user} calledfrom={props.calledfrom} /> : (
                <>
                    <div className="space" />
                    <div className='onerow' >
                        <div className="left_side" onClick={() => handleclick(user)}>
                            <div className="pic">
                                {/* <img src={user.name.charAt(0).UpperCase()} alt="" /> */}
                                <Avatar>{user.name ? user.name.charAt(0).toUpperCase() : "A"}</Avatar>
                            </div>
                            <div className="info">
                                <p className="username">{user.name}</p>
                                <p className="followStatus">following</p>
                            </div>
                        </div>
                        <div className="right_side" onClick={closemodal}>
                            <div className='closeicon'><CloseIcon fontSize='small' /></div>
                        </div>
                    </div>
                </>
            )
            }
        </div>
    )
}

export default SearchedUser