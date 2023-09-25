import React, { useEffect, useContext, useState } from "react";
import "./Homepage.css";
import Sidenav from "../navigation/Sidenav";
import Timeline from "../timeline/Timeline";
import Profile from "./Profile";
import { useNavigate } from 'react-router-dom'
import Loadinghome from "./Loadinghome";

function Homepage() {

  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [otherUserData, setOtherUserData] = useState({});

  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const [showProfile, setShowProfile] = useState(false);

  const [needReload, setNeedReload] = useState(false);

  const [calledfrom, setcalledfrom] = useState("sidenav");
  // show current users data 
  const loginuser = async () => {
    try {
      const res = await fetch('/getdata', {
        method: "GET",
        Headers: {
          "Content-Type": "application/json"
        },
      });

      const data = await res.json();
      setUserData(data);

      setIsLoading(false);

    } catch (error) {
      console.log("no token history found");
      // console.log(error);
      navigate("/login");
    }
  }

  useEffect(() => {
    console.log("reloading");
    loginuser();
  }, [needReload]);


  const Reload = (flag) => {
    console.log("homepage reload ", flag)
    setNeedReload(flag);
  }


  return (
    <div className="homepage">
      {isLoading ? <Loadinghome /> : (
        <>
          <div className="homepage__nav">
            <Sidenav userData={userData} setShowProfile={setShowProfile} showProfile={showProfile} Reload={Reload} setcalledfrom={setcalledfrom} calledfrom={calledfrom} setOtherUserData={setOtherUserData} />
          </div>
          <div className="homepage__timeline">
            {  //if showprofile is false then execute timeline code 
              showProfile ? calledfrom === "sidenav" ? <Profile userData={userData} calledfrom={"sidenav"} /> : calledfrom === "search" ? <Profile userData={otherUserData} calledfrom={"search"} /> : calledfrom === "message" ? <Profile userData={userData} calledfrom={"message"} /> : null : <Timeline userData={userData} />
            }
          </div>
        </>
      )}
    </div >
  )
}

export default Homepage;
  