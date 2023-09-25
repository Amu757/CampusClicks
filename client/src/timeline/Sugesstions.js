import React from "react";
import "./Sugesstions.css";
import { Avatar } from "@mui/material";

function Sugesstions() {
  return <div className="sugessions">
    <div>
      <div className="suggestions__titile">Sugesstions for you</div>
      <a href="#">See All</a>
    </div>
    <div className="suggestions__usernames">
      <div className="suggestion__username">
        <div className="username__left">
          <span className="avatar">
            <Avatar>A</Avatar>
          </span>
          <div className="username__info">
            <span className="username">amu007_</span>
            <span className="relation">New to Instagram</span>
          </div>
        </div>
        <button className="follow_button">Follow</button>
      </div>
    </div>

    <div className="suggestions__usernames">
      <div className="suggestion__username">
        <div className="username__left">
          <span className="avatar">
            <Avatar>A</Avatar>
          </span>
          <div className="username__info">
            <span className="username">amu007_</span>
            <span className="relation">New to Instagram</span>
          </div>
        </div>
        <button className="follow_button">Follow</button>
      </div>
    </div>

    <div className="suggestions__usernames">
      <div className="suggestion__username">
        <div className="username__left">
          <span className="avatar">
            <Avatar>A</Avatar>
          </span>
          <div className="username__info">
            <span className="username">amu007_</span>
            <span className="relation">New to Instagram</span>
          </div>
        </div>
        <button className="follow_button">Follow</button>
      </div>
    </div>

  </div>
}

export default Sugesstions;
