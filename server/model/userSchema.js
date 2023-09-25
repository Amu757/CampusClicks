const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    profilePic: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    following: [
        {
            userid: {
                type: String,
            }
        },
    ],
    followers: [
        {
            userid: {
                type: String,
            }
        },
    ],
    posts: [
        {
            user: {
                type: String,
                required: true
            },
            imgUrl: {
                type: String,
                required: true
            },
            caption: {
                type: String
            },
            likes: {
                type: Number
            },
            timestamp: {
                type: Number
            },
        },
    ],
    messages: [
        {
            name: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            message: {
                type: String,
                required: true
            }
        },
    ],
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})


// we are hashing the password
userSchema.pre('save', async function (next) {
    //if user modifies password field;
    if (this.isModified('password')) {
        // password in registration page
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next(); // call to post required function 
})

//we are generating token
userSchema.methods.generateAuthToken = async function () {
    try {
        //playload must be unique and must match database id with user id tring to login
        let newtoken = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        //in userSchema tokens > token concat newtoken
        this.tokens = this.tokens.concat({ token: newtoken });
        await this.save();
        return newtoken;
    } catch (error) {
        console.log(error);
    }
}
// stored the message
userSchema.methods.addMessage = async function (name, email, message) {
    try {
        this.messages = this.messages.concat({ name, email, message });
        await this.save();
        return this.message;
    } catch (error) {
        console.log(error);
    }
}
//store posts
userSchema.methods.addPost = async function (imgUrl, caption, user) {
    try {

        const now = new Date();
        // const timestamp = `${now.getHours()}:${now.getMinutes()}`;
        const timestamp = now.getTime();

        let likes = 0;
        this.posts = this.posts.concat({ imgUrl, caption, user, likes, timestamp, });
        await this.save();

        // Return the newly added post
        return { imgUrl, caption, name, likes, timestamp };

    } catch (error) {
        console.log(error);
    }
}

userSchema.methods.likePost = async function (postId) {
    try {
        const post = this.posts.find((p) => p._id.toString() === postId);

        if (!post) {
            throw new Error('Post not found');
        }

        post.likes += 1;
        await this.save();

        return post.likes;
    } catch (error) {
        console.log(error);
    }
}


//make a user scema in database and return the modal
const User = mongoose.model('USER', userSchema);

module.exports = User;
