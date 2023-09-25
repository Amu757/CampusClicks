import React, { useState } from 'react'
import "./Post.css"
import { Avatar } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { ChatBubbleOutline, FavoriteBorder } from '@mui/icons-material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import TelegramIcon from '@mui/icons-material/Telegram';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';

// function Post({ user, imgUrl, likes, timestamp, caption }) {
function Post({ userid, user, postImage, likes, timestamp, postitem }) {

    const [likedbyuser, setLikedbyUser] = useState(false);

    const [locallikes, setLocalLikes] = useState(likes);

    let postid = postitem._id;
    const handlelike = async () => {
        // console.log("liked")
        setLikedbyUser(!likedbyuser);
        setLocalLikes(locallikes + 1);

        // console.log("this is post", postitem);
        const res = await fetch("/addlike", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                postid, userid
            })
        });
        const data = await res.json();

        if (data.status === 500 || !data) {
            console.log("invalid req")
        }
        else {
            console.log("liked succesfuly",)
        }
    }

    return (
        <div className='post'>
            <div className="post__header">
                <div className='post__headerAuthor'>
                    <Avatar>{user.charAt(0).toUpperCase()}</Avatar>
                    {user} . <span>{timestamp}</span>
                </div>
                <MoreHorizIcon />
            </div>
            <div className="post__image">
                <img src={postImage} alt='postImage'></img>

            </div>
            <div className="post__footer">
                <div className="post__footerIcons">
                    <div className="post__iconsMain">
                        <div onClick={handlelike}>{likedbyuser ? (<FavoriteIcon style={{ color: "red", fontSize: "30px" }} />) : (<FavoriteBorder className='postIcon' />)}</div>
                        <ChatBubbleOutline className='postIcon' />
                        <TelegramIcon className='postIcon' />
                    </div>
                    <div className='post__iconSave'>
                        <TurnedInNotIcon className='postIcon' />
                    </div>
                </div>
                Liked by {locallikes ? (locallikes) : likes} people
            </div>

        </div>
    )
}

export default Post