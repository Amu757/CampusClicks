import React, { useState } from 'react'
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import InfoIcon from '@mui/icons-material/Info';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import MicIcon from '@mui/icons-material/Mic';
import PhotoIcon from '@mui/icons-material/Photo';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


function MessagingUi(props) {

    const [inputValue, setInputValue] = useState('');
    const [userid, setuserid] = useState(props.userData._id);

    const handleKeyPress = async (event) => {
        if (event.key === 'Enter') {
            console.log("your msg ", inputValue);

            event.target.value = "";
            try {
                const res = await fetch("/saveMessage", {
                    method: "POST",
                    Headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ inputValue, userid })
                });

                if (!res.ok) {
                    throw new Error(`Request failed with status: ${res.status}`);
                }

                const data = await res.json();

                if (data.success) {
                    console.log("Message saved successfully");
                } else {
                    console.log("Error saving the message:", data.message);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }
    };


    return (
        <div className='msgouter_container'>
            <div className="headingpart">
                <div className="userinfotank">
                    <div className="img_user"><h1>A</h1></div>
                    <div ><h4>user name</h4><p>Active 1 hr ago</p> </div>
                </div>
                <div className="iconstank">
                    <CallIcon />
                    <VideocamIcon />
                    <InfoIcon />
                </div>
            </div>
            <div className="textscreen">

            </div>
            <div className="bottompart">

                <div className="inputtank">
                    <SentimentSatisfiedAltIcon fontSize='large' style={{ color: "grey" }} />
                    <input onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyPress} value={inputValue} type="text" placeholder='Message...' />
                </div>
                <div className="iconstank">
                    <MicIcon />
                    <PhotoIcon />
                    <FavoriteBorderIcon />
                </div>
            </div>
        </div>
    )
}

export default MessagingUi