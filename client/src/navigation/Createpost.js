import React, { useState } from 'react';
import { MdCloudUpload } from 'react-icons/md';
import "./createpost.css"

export let callShowPosts = true;

function PostForm({ onClose, userData, Reload }) {
    // const [showCreatePost, setShowCreatePost] = useState(false);

    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(false);

    const imagebase64 = async (file) => {
        const reader = new FileReader()
        await reader.readAsDataURL(file)
        const data = new Promise((resolve, reject) => {
            reader.onload = () => resolve(reader.result)
            reader.onerror = (err) => reject(err)
        })
        return data;
    }

    const handleCaptionChange = (event) => {
        setCaption(event.target.value);
    };

    const handleImageChange = async (event) => {
        const selectedImage = event.target.files[0];
        setImage(selectedImage);

        if (selectedImage) {
            const image64data = await imagebase64(selectedImage);
            setImage(image64data);
        }
    };

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        if (image) {
            const res = await fetch("/upload", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userID: userData._id, imgUrl: image, caption: caption })
            });
            const data = await res.json();
            // console.log(data);
            if (data.success) {
                console.log('sucessful');
                alert(data.Message);

                Reload(true);
                console.log("reload createpost done");

                onClose();
                // reload userdata in homepage
            } else {
                console.log('unsucessful');
                console.log(data.Message);
            }
        }
    };


    return (
        <>
            <div className='postmodal'>
                <div className='closemodal' onClick={onClose}> <i class="zmdi zmdi-close"></i></div>
                <div className='outer-container' id='mycontainer'>
                    <p>Create New Post</p>
                    <hr className='hr' />
                    <form className="inputs">
                        <div className='imgbox'>
                            <label htmlFor='uploadImage' className='labelbox'>
                                <input type="file" id='uploadImage' accept="image/*" onChange={handleImageChange} />
                                {image ? <img src={image} alt='brokenlink' /> : <MdCloudUpload />}
                            </label>
                        </div>

                        <div className='postmessagebox'>
                            <label htmlFor='imgCaption'>
                                <textarea id='imgCaption' placeholder='Write a caption..' value={caption} onChange={handleCaptionChange} />
                            </label>
                        </div>
                        <button onClick={handlePostSubmit} className='sharebtn'>Share</button>
                    </form>
                </div>
            </div >

        </>
    );
}

export default PostForm;
