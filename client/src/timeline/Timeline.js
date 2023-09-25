import React, { useEffect, useState, useRef } from "react";
import Post from "./posts/Post";
import Sugesstions from "./Sugesstions";
import "./Timeline.css";
import Loadinghome from "../components/Loadinghome";
// import Homepage from "../components/Homepage";


function Timeline(props) {
  const [allPosts, setAllPosts] = useState([]);

  const [isLoading, setIsLoading] = useState(true); // Add loading state

  // get all posts to show in homwpage
  const alluserposts = async () => {

    setIsLoading(true);

    fetch("/showpost", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then((res) => {
        if (res.status !== 200) {
          const error = new Error(res.error);
          throw error;
        }
        return res.json();
      })
      .then((data) => {
        // Use map and concat to extract and flatten all posts into a single array
        setAllPosts(data.data.flatMap((user) => user.posts));
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    alluserposts();
  }, []);

  function convertTimestamp(timestamp) {
    const date = new Date(timestamp);

    // Extract date components
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based
    const year = date.getFullYear();

    // Extract time components
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Format date and time as two-digit strings
    const formattedDay = day.toString().padStart(2, '0');
    const formattedMonth = month.toString().padStart(2, '0');
    const formattedYear = year.toString();
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    // Combine date and time in the desired format
    const formattedDate = `${formattedDay}/${formattedMonth}/${formattedYear}`;
    const formattedTime = `${formattedHours}:${formattedMinutes}`;

    return `${formattedDate} ${formattedTime}`;
  }

  return (
    <div className="timeline">
      <div className="timeline__left">
        <div className="timeline__posts">

          {isLoading ? <Loadinghome /> : (
            allPosts.map((postitem, index) => (
              <Post userid={props.userData._id} key={index} postitem={postitem} user={postitem.user} postImage={postitem.imgUrl} likes={postitem.likes} timestamp={convertTimestamp(postitem.timestamp)} />
            ))
          )
          }

        </div>
      </div>
      <div className="timeline__right">
        <Sugesstions />
      </div>
    </div>
  );
}

export default Timeline;

