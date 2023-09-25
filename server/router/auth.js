const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const authenticate = require("../middleware/authenticate");

const User = require('../model/userSchema');
const Admin = require('../model/AdminSchema');

const currentUserObj = {};


router.post("/saveMessage", async (req, res) => {
    try {
        const { inputValue, userid } = req.body;

        // Find the user document that contains the post
        let founduser = await User.findOne({ _id: userid });
        console.log("bakend i got user",);

        if (!founduser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }



    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }

})


router.post("/addlike", async (req, res) => {
    try {
        const { postid, userid } = req.body;

        // Find the user document that contains the post
        let user = await User.findOne({ _id: userid });
        console.log("bakend i got user",);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Find the post within the user's posts array
        let post = user.posts.find((p) => p._id.toString() === postid);

        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        // Call the likePost method to increment the likes count
        const likesCount = await user.likePost(postid);

        // Save the updated user object
        await user.save();

        res.status(200).json({ success: true, message: "Post liked successfully", likesCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.get('/showpost', async (req, res) => {
    try {
        const allPosts = await User.find({}, 'posts')
            .populate({
                path: 'posts', // Name of the field in the User schema containing post references
                select: 'user imgUrl caption likes timestamp', // Specify the fields you want from the posts
            })
            .select('posts'); // Select username and the populated posts

        if (!allPosts) {
            return res.status(404).json({ message: 'No posts found' });
        }

        res.json({ message: 'All posts for all users', data: allPosts });
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

})

router.get('/findusers', async (req, res) => {
    try {
        const { inputValue } = req.query;

        // case insensitive search
        const allusers = await User.find({ name: inputValue.toLowerCase() }).exec();

        if (!allusers || allusers.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }

        res.json({ message: 'All users', data: allusers });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
})


//upload post data 
router.post('/upload', async (req, res) => {
    try {
        let { userID, imgUrl, caption } = req.body;
        const userPost = await User.findOne({ _id: userID })

        if (userPost) {
            const postDetails = await userPost.addPost(imgUrl, caption, userPost.name)

            await userPost.save();

            res.status(201).json({ Message: "post details are Saved", success: true, postdata: postDetails })
        } else {
            console.log("user not found");
        }
    } catch (error) {
        res.send({ Message: error, success: false })
        console.log("invalid ", error);
    }
})

router.post('/register', async (req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body;

    // empty field not allowed
    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "plz fill all the fields in the form" })
    }
    try {
        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(422).json({ error: "Email Already Exist" });
        } else if (password != cpassword) {
            return res.status(422).json({ error: "Password are not matching" });
        } else {
            // get user data 
            const user = new User({ name, email, phone, work, password, cpassword });

            // run pre function to incrypt and create new user in database
            await user.save();
            //if done properly 
            res.status(201).json({ message: "User registered succesfuly" });
        }
    } catch (err) {
        console.log(err);
    }

})

router.post('/signin', async (req, res) => {
    try {
        console.log("login page")
        const { email, password, isAdminLogin } = req.body;

        // empty field not allowed
        if (!email || !password) {
            return res.status(400).json({ error: "please fill data" })
        }

        if (isAdminLogin == false) {
            console.log("this is user login");
            const userdata = await User.findOne({ email: email });
            // returns the relative document/ object 
            if (userdata) {
                currentUserEmail = email;
                //userLogin contains obj of matching email of user
                //method to compair input with hashed data in db
                const isMatch = await bcrypt.compare(password, userdata.password);

                const token = await userdata.generateAuthToken();

                res.cookie('jwtoken', token, {
                    // cookie expires in 30days from current date
                    expires: new Date(Date.now() + 25892000000),
                    httpOnly: true // to run on http also
                })

                if (!isMatch) {
                    res.status(400).json({ error: "Invalid Credentials !!" })
                } else {
                    console.log("user Signin Successfuly..");
                    res.json({ user: userdata });
                }
            } else {
                res.status(400).json({ error: "Invalid Credentials !!" })
            }
        } else if (isAdminLogin == true) {
            console.log("this is admin login");
            // Admin login logic
            const adminData = await Admin.findOne({ email: email });

            if (adminData) {
                // Compare the provided password with the hashed password in the database
                // const isMatch = await bcrypt.compare(password, adminData.password);
                // if(isMatch != true)

                if (password != adminData.password) {
                    return res.status(400).json({ error: "Invalid Credentials" });
                }
                // Generate a token for the admin
                const token = await adminData.generateAuthToken();

                adminData.tokens.push({ token });

                // Save the updated adminData with the new token
                await adminData.save();

                res.cookie('jwtoken', token, {
                    expires: new Date(Date.now() + 25892000000),
                    httpOnly: true
                });

                console.log("Admin Signin Successfuly..");
                return res.json({ admin: adminData });
            } else {
                return res.status(400).json({ error: "Invalid Credentials" });
            }
        }

    } catch (err) {
        res.status(400).json({ error: "Invalid Credentials !!" })
        console.log(err);
    }
})


// about us page
router.get('/about', authenticate, (req, res) => {
    console.log(' About page api')
    res.send(req.rootUser)
})
router.get('/profile', authenticate, (req, res) => {
    console.log(' profile page api')
    res.send(req.rootUser)
})

// get userdata like cookie
router.get('/getdata', authenticate, (req, res) => {
    console.log("getdata api call")
    const currentUserObj = req.rootUser;
    res.send(req.rootUser)
})

//const us page
router.post('/contact', authenticate, async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        if (!name || !email || !phone || !message) {
            console.log("error in contact form");
            return res.json({ error: "please filled the contact form " });
        }

        const userContact = await User.findOne({ _id: req.userID });

        if (userContact) {
            const userMessage = await userContact.addMessage(name, email, phone, message);

            await userContact.save()

            res.status(201).json({ message: "user Contact successfully " })
        }

    } catch (error) {
        console.log(error);
    }
})


// Logout  page
router.get('/logout', (req, res) => {
    console.log('this is Logout api call')
    res.clearCookie('jwtoken', { path: '/' })
    res.status(200).send("User Log out successfuly")
})


router.get("/showusers", async (req, res) => {
    console.log("this is showusers api for admin");

    try {
        const allUsers = await User.find({}, 'email')
        if (!allUsers) {
            return res.status(404).json({ message: 'No users found' });
        }

        res.json({ message: 'All Users', data: allUsers });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

router.delete('/users', async (req, res) => {
    const useremail = req.query.email;

    try {
        // Find the user by email and delete it
        const deletedUser = await User.findOneAndDelete({ email: useremail });

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User removed successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;
module.exports.currentUserObj = currentUserObj;