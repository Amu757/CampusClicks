import React, { useEffect, useState } from 'react';
import './profile.css'
import { useNavigate } from "react-router-dom";
import GridOnIcon from '@mui/icons-material/GridOn';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import MessagingUi from "./messages/MessagingUi"
const Profile = (props) => {

    const navigate = useNavigate();
    const [userData, setUserData] = useState(props.userData);

    const [activeTab, setActiveTab] = useState("posts");
    const [showMsgScreen, setShowMsgScreen] = useState(false);

    useEffect(() => {
        console.log(props.calledfrom);
        if (props.calledfrom === "sidenav") {
            document.getElementById("outside_container").classList.remove("onlyforsearch");
            document.getElementById("outside_container").classList.remove("othersprofile");

        } else if (props.calledfrom === "search") {
            document.getElementById("outside_container").classList.add("onlyforsearch");
            document.getElementById("outside_container").classList.remove("othersprofile");
        } else if (props.calledfrom === "message") {
            document.getElementById("outside_container").classList.add("othersprofile");
            document.getElementById("outside_container").classList.remove("onlyforsearch");
        }
    }, [])

    const handleclick = (tabId) => {
        setActiveTab(tabId);
        //based activeTab value fetching values
    }
    const handlemsg = () => {
        setShowMsgScreen(true);
        console.log('go to msg ')
    }


    return (
        <div className='profile' id='outside_container'>
            {showMsgScreen ? <MessagingUi userData={userData} /> : (
                <>
                    <div className="profileheader">
                        <div className="left">
                            <div className="proimg">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/1/14/Deadpool_2_Japan_Premiere_Red_Carpet_Ryan_Reynolds_%28cropped%29.jpg" alt="no img" />
                            </div>
                        </div>
                        <div className="right">
                            {/* <button className='messagebtn btn'>Message</button> */}
                            <div className="row1 ">{userData.name}
                                <div><button className='followbtn btn'>Follow</button><button className='messagebtn btn' onClick={handlemsg}>Message</button><button className='editprofile btn'>Edit Profile</button></div>
                            </div>
                            <div className="row2"><div>{userData && userData.posts ? userData.posts.length : "wait"} Posts</div>   <div>{userData && userData.posts ? userData.followers.length : "Wait"} Followers</div> <div>{userData && userData.posts ? userData.following.length : "wait"} Following</div></div>
                            <div className="row3">Ryan Reynolds
                                Owner @aviationgin & @mintmobile @maximumeffort & @wrexham_afc 🇨🇦 <br />links</div>
                            <div className="row4"><span className='grey'>Followed by </span> shubhamsinekar, nayansarika_05, hiteshchikhlondhe <span className='grey'>+ 4 more</span></div>
                        </div>
                    </div>

                    <div className="savedstory">
                        <div className="section">
                            <div className='imgcontainer'>
                                <img src="https://c8.alamy.com/comp/F65YMP/selfless-year-2015-usa-director-tarsem-singh-ryan-reynolds-ben-kingsley-F65YMP.jpg" alt="check path" />
                            </div>
                            <p className='title'>adam bloopers</p>
                        </div>
                        <div className="section">
                            <div className='imgcontainer'>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhylKiZN64SDzdb_4YjlLgE7miGZjXeTx9DPr4Duf_8WOdlbkXdzuOXl4-sMJ0m6YqqbM&usqp=CAU" alt="check path" />
                            </div>
                            <p className='title'>userground 6</p>
                        </div>
                        <div className="section">
                            <div className='imgcontainer'>
                                <img src="https://assets-prd.ignimgs.com/2022/06/09/ryan-reynolds-slideshow-cover-1654817695398.jpg" alt="check path" />
                            </div>
                            <p className='title'>dead pool</p>
                        </div>
                        <div className="section">
                            <div className='imgcontainer'>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSKiqTC26GbI3SJFZBrSOh1hpVce6VdkfGzv-upQo2jtuOyPvAnlQYGEeNFJDnnd9smXk&usqp=CAU" alt="check path" />
                            </div>
                            <p className='title'>lanten</p>
                        </div>
                    </div>

                    <div className="userdata">
                        <div className={`line ${activeTab === "posts" ? "lineonposts" : activeTab === "reels" ? "lineonreels" : activeTab === "saved" ? "lineonsaved" : "lineontagged"}`}></div>
                        <div className="top">
                            <div className="postsbtn align" onClick={() => handleclick("posts")}><GridOnIcon />POSTS</div>
                            <div className="reels align" onClick={() => handleclick("reels")}><SlideshowIcon />REELS</div>
                            <div className="saved align" onClick={() => handleclick("saved")}><BookmarkIcon />SAVED</div>
                            <div className="tags align" onClick={() => handleclick("tagged")}><AssignmentIndIcon />TAGGED </div>
                        </div>
                        <div className="bottom">
                            <div className="postpage">
                                {userData && userData.posts ?  // if useris present
                                    // if posts is clicked then show posts 
                                    activeTab === "posts" ? (userData.posts.map((singlepost) => (
                                        <div className="postcontainer"><img src={singlepost.imgUrl} alt="slow internet" /></div>
                                    ))  //else show this
                                    ) : activeTab === "reels" ? (<p>no reels uploded</p>) : activeTab === "saved" ? (<p>no saved</p>) : (<p>no tags</p>)
                                    //
                                    : (<p>no data found</p>)
                                }
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )

}
export default Profile;