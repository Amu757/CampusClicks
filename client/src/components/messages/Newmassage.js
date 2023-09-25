import React, { useState, useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import "./newmsg.css";
import LoadingAnimations from '../LoadingAnimations';
import SearchedUser from '../search/SearchedUser';

function Newmassage(props) {
    const [inputValue, setValue] = useState('');
    const [searched, setSearched] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Add loading state
    // const [resize, setResize] = useState(false); // Add loading state


    const handleSearch = async (event) => {
        setValue(event.target.value);
    }


    const findusers = () => {
        setIsLoading(true);

        if (inputValue !== "") {
            const url = `/findusers?inputValue=${inputValue}`;
            fetch(url, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
            })
                .then((res) => {
                    if (res.status === 404) {
                        const error = new Error(res.error);
                        setIsLoading(false);
                        throw error;
                    }
                    // converting to json
                    const data = res.json();
                    return data;
                })
                .then((data) => {
                    // Use map and concat to extract and flatten all posts into a single array
                    const temp = data.data.flatMap((user) => user);
                    console.log(temp)
                    setSearched(temp);
                    setIsLoading(false);
                })
                .catch((err) => {
                    setSearched(null);
                });
        }
    }

    useEffect(() => {
        console.log("called from msg now resize adding")
        if (props.addresize) {
            document.getElementById("newmsgmodal").classList.add("resize");
        } else {
            document.getElementById("newmsgmodal").classList.remove("resize");
        }
    }, [props.addresize]);

    useEffect(() => {
        findusers();
    }, [inputValue]);

    return (
        <div className="newmsgmodal" id='newmsgmodal'>
            <div className="section_">
                <div className="toparea_">
                    <div className="titlearea"><h3>New Message</h3>
                        <div className="clodemodal" onClick={() => props.setShowNewMessage(!props.showNewMessage)}><CloseIcon fontSize='large' /></div>
                    </div>
                    <div className="inputsearch"> TO:
                        <input onChange={handleSearch} value={inputValue} type="text" placeholder='Search..' />
                    </div>
                </div>
                <div className="bottomarea">
                    {isLoading && inputValue != "" ? <LoadingAnimations /> : searched !== null ? (searched.map((user, index) => (
                        <SearchedUser key={index} User={user} calledfrom={"message"} setcalledfrom={props.setcalledfrom} setOtherUserData={props.setOtherUserData} setShowProfile={props.setShowProfile} setShowNewMessage={props.setShowNewMessage} showNewMessage={props.showNewMessage} setaddresize={props.setaddresize} setRecieverSelected={props.setRecieverSelected} recieverselected={props.recieverselected} />
                    ))) : (<h4>No account found</h4>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Newmassage