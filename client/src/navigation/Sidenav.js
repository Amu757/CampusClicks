import React, { useEffect, useState } from "react";
import "./Sidenav.css";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import ChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MenuIcon from "@mui/icons-material/Menu";

import Createpost from "./Createpost";
import Search from "../components/search/Search";
import Message from "../components/messages/Message";
import { NavLink } from 'react-router-dom';

// import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import logoImage from "../images/logo2.png";



function Sidenav(props) {

  const [userdata, setUserData] = useState("");

  const [showCreatePost, setShowCreatePost] = useState(false);

  const [showSearch, setShowSearch] = useState(false);

  const [showMessage, setShowMessage] = useState(false);

  const [activeBtn, setActiveBtn] = useState("homeicon");
  const [preactiveBtn, setpreActiveBtn] = useState("homeicon");

  const [recieverSelected, setRecieverSelected] = useState(false);

  const handleToggleCreatePost = () => {
    setShowCreatePost(!showCreatePost);
  };

  useEffect(() => {
    setUserData(props.userData);
  }, []);

  useEffect(() => {
    const preiconbox = document.getElementById(preactiveBtn);
    const iconbox = document.getElementById(activeBtn);

    // switch (activeBtn) {
    //   case "searchincon":
    //     setShowMessage(!showMessage);
    //     // setShowSearch(!showSearch);
    //     console.log('search', activeBtn);
    //     break;

    //   case "messageicon":
    //     setShowSearch(!showSearch);
    //     // setShowMessage(!showMessage);
    //     console.log('messages', activeBtn);
    //     break;

    //   default:
    //     setShowSearch(false);
    //     setShowMessage(false);
    //     console.log('we are in homepage', activeBtn);
    //     break;
    // }

    if (activeBtn !== "profile") {
      props.setShowProfile(false);
    }

    if (activeBtn !== "searchicon") {
      if (showSearch === true) {
        setShowSearch(!showSearch);
      }
    }
    console.log("you clicked ", activeBtn);
    if (activeBtn !== "messageicon") {
      console.log("not messageicon");
      // if (showMessage === true) {
      setShowMessage(false);
      // }
    }


    preiconbox.classList.remove("activeicon")
    iconbox.classList.add("activeicon")
    setpreActiveBtn(activeBtn);

  }, [activeBtn]);

  return (
    <div className="sidenav">
      <div>
        <img
          className="sidenav__logo"
          // src="https://www.edigitalagency.com.au/wp-content/uploads/instagram-logo-icon-white-border-text-black-background.png"
          src={logoImage}
          alt="logo"></img>
      </div>
      <div className="sidenav__buttons">
        <button className="sidenav__button" onClick={() => { props.setShowProfile(false); setActiveBtn("homeicon"); }}>
          <div id="homeicon" ><HomeIcon /></div>
          <span>Home</span>
        </button>
        <button className="sidenav__button" onClick={() => { setShowSearch(!showSearch); setActiveBtn("searchicon") }}>
          <div id="searchicon"><SearchIcon /></div>
          <span>Search</span>
        </button>
        <button className="sidenav__button" onClick={() => setActiveBtn("exploreicon")}>
          <div id="exploreicon"><ExploreIcon /></div>
          <span>Explore</span>
        </button>
        <button className="sidenav__button" onClick={() => setActiveBtn("reelsicon")}>
          <div id="reelsicon"><SlideshowIcon /></div>
          <span>Reels</span>
        </button>
        <button className="sidenav__button" onClick={() => { setShowMessage(!showMessage); setActiveBtn("messageicon") }}>
          <div id="messageicon"><ChatAltIcon /></div>
          <span>Messages</span>
        </button>
        <button className="sidenav__button" onClick={() => setActiveBtn("notifyicon")}>
          <div id="notifyicon"><FavoriteBorderIcon /></div>
          <span>Notifications</span>
        </button>
        <button className="sidenav__button" onClick={() => { setShowCreatePost(!showCreatePost); setActiveBtn("createposticon") }}>
          <div id="createposticon"><AddOutlineIcon /></div>
          <span>Create</span>
        </button>

        <button className="sidenav__button profilebtn" onClick={() => { props.setcalledfrom('sidenav'); props.setShowProfile(!props.showProfile); }}>
          <Avatar>{userdata.name ? userdata.name.charAt(0).toUpperCase() : "A"}</Avatar>
          <span>{userdata.name ? userdata.name : "User_Name"}

          </span>
        </button>

      </div>
      <div className="sidenav__more">
        <button className="sidenav__button">
          <MenuIcon />
          <span>More</span>
          <NavLink to="/logout" className="logout__button">Logout</NavLink>
        </button>
      </div>
      {showCreatePost && <Createpost userData={userdata} onClose={handleToggleCreatePost} Reload={props.Reload} />}
      {showSearch && <Search setcalledfrom={props.setcalledfrom} calledfrom={props.calledfrom} setOtherUserData={props.setOtherUserData} setShowProfile={props.setShowProfile} recieverselected={recieverSelected} setRecieverSelected={setRecieverSelected} />}
      {showMessage && <Message setcalledfrom={props.setcalledfrom} setOtherUserData={props.setOtherUserData} setShowProfile={props.setShowProfile} />}
    </div >
  );
}



export default Sidenav;
