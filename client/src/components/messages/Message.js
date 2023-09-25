import React, { useEffect, useState } from 'react'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import EditNoteIcon from '@mui/icons-material/EditNote';
import './message.css'
import Newmassage from './Newmassage';
function Message(props) {

    const [showNewMessage, setShowNewMessage] = useState(false);
    const [addresize, setaddresize] = useState(false);
    const [recieverselected, setRecieverSelected] = useState(false);

    return (

        <div className="message_container" >
            <div className="leftpart">
                <div className="top_" onClick={() => setShowNewMessage(!showNewMessage)}>
                    <div className="newmsgicon"><EditNoteIcon fontSize='large' /></div>
                </div>
                <div className="bottom">
                    <div className='title'>Messages</div>
                    <div className="Messages">
                        {/* show prifiles old msges */}
                    </div>
                </div>
            </div>
            <div className="rightpart">
                <div className="icons" onClick={() => setShowNewMessage(!showNewMessage)}><QuestionAnswerIcon fontSize='large' /></div>
                <h3>Your Messages</h3>
                <p>Send private photos and messages to a friend or group.</p>
                <buttom className="sendmsgbtn" onClick={() => setShowNewMessage(!showNewMessage)}>
                    Send Message
                </buttom>
            </div>
            {showNewMessage ? <Newmassage setShowNewMessage={setShowNewMessage} showNewMessage={showNewMessage} setaddresize={setaddresize} addresize={addresize} setcalledfrom={props.setcalledfrom} setOtherUserData={props.setOtherUserData} setShowProfile={props.setShowProfile} recieverselected={recieverselected} setRecieverSelected={setRecieverSelected} /> : null}
        </div>
    )
}

export default Message