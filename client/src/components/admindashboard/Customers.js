import React, { useEffect, useState } from 'react'
import "./customers.css";
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Loadinghome from "../Loadinghome";

function Customers() {

    const [allUsers, setAllUsers] = useState([]);

    const [isLoading, setIsLoading] = useState(true); // loading state

    useEffect(() => {
        fetch("/showusers", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
        })
            .then((res) => {
                if (res.status !== 200) {
                    const error = new Error(res.error);
                    throw error;
                }
                console.log("converting to json");
                return res.json();
            })
            .then((data) => {
                // Use map and concat to extract and flatten all posts into a single array
                console.log("returning maping data", data.data);
                setAllUsers(data.data.flatMap((user) => user.email));
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });

    }, [])

    useEffect(() => {
        console.log(allUsers);
    }, [allUsers])



    const getconfirm = () => {
        return window.confirm("do you really want to delete this user");
    }


    const removeuser = (useremail) => {
        console.log("removeuser clicked for: ", useremail);

        let ans = getconfirm();
        if (ans) {
            // Send a DELETE request to your server to remove the user
            fetch(`/users?email=${useremail}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            })
                .then((res) => {
                    if (res.status !== 500) {
                        // User successfully removed
                        console.log(`User with email ${useremail} removed.`);
                        alert(`User with email ${useremail} removed.`);
                    } else {
                        // Handle error here
                        alert(`ERROR removing User with email ${useremail}.`);
                        console.error(`Error removing user with email ${useremail}`);
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    };

    const showuserdata = (useremail) => {
        console.log("this is user data");
    }

    const edituserdata = (useremail) => {
        console.log("you can edit user data");
    }



    return (
        isLoading ? <Loadinghome /> : (
            <div className='outer_container'>
                <div className="heading_bar">
                    <div className="emails">
                        Customer Email
                    </div>
                    <div className="actions">
                        Actions
                    </div>
                </div>
                <div className="content_area">
                    <div className="emailsarea">
                        <ul>
                            {allUsers.map((email, index) => (
                                <li key={index}>{email}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="actionsarea">
                        <ul>
                            {allUsers.map((email, index) => (
                                <li key={index}>
                                    <VisibilityIcon />
                                    <EditNoteIcon />
                                    <DeleteIcon onClick={() => removeuser(email)} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        )
    )
}

export default Customers