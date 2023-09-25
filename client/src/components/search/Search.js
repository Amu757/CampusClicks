import React, { useEffect, useState } from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
import SearchedUser from "./SearchedUser";
import './search.css'
import LoadingAnimations from '../LoadingAnimations';

const Search = (props) => {
    const preSearch = false;
    const [inputValue, setValue] = useState('');
    const [searched, setSearched] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Add loading state

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
                        setSearched(null);
                        throw error;
                    }
                    console.log("still inside processing data");
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
                    console.log("final", temp);
                })
                .catch((err) => {
                    setSearched(null);
                });
        }
    }

    useEffect(() => {
        props.setcalledfrom('search');
        findusers();
    }, [inputValue]);


    return (
        <div className='searchpage'>
            <div className="toparea">
                <h3>Search</h3>
                <div className="searcharea">
                    <input onChange={handleSearch} value={inputValue} type="text" placeholder='Search Name' /><div onClick={() => setValue("")}><CancelIcon fontSize='small' /></div>
                </div>
            </div>
            <div className="bottom_side">
                <h5>Recent</h5>
                {
                    isLoading && inputValue != "" ? <LoadingAnimations /> : searched !== null ? (searched.map((user, index) => (
                        <SearchedUser key={index} User={user} setcalledfrom={props.setcalledfrom} calledfrom={"search"} setOtherUserData={props.setOtherUserData} setShowProfile={props.setShowProfile} recieverselected={props.recieverselected} setRecieverSelected={props.setRecieverSelected} />
                    ))) : (<h4 className='nouser'>No User Found</h4>)
                }
            </div>
        </div>
    )
}

export default Search