const mongoose = require('mongoose');
const argon2 = require('argon2');
const express = require('express');
const router = express.Router();

const ADMIN_ROLE = "admin";


const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    role: String,
});


// This allows for logic before we save a User.
userSchema.pre('save', async function (next) {
    // If the password hasn't been modified, then skip this logic and just continue on to the next thing.
    if (!this.isModified('password')){
        return next()
    }

    try {
        // Try and generate a hash of the value set for the password, and save it as the password.
        // Important to note here, argon2 uses salts and stores them with the passwords, so we don't have to worry about
        // salting ourselves.
        this.password = await argon2.hash(this.password);
        next()
    } catch (e) {
        next(e)
    }
});

// This allows for a method on the schema to compare passwords securely using the argon2 library.
userSchema.methods.comparePassword = async function(password) {

    // The verify() command returns a boolean
    try {
        return await argon2.verify(this.password, password)
    } catch (e) {
        console.log(e);
        return false;
    }
};

// This method should be used whenever returning data to a client. It strips out the password from the user, so we don't
// ever send the encrypted password across the wire.
userSchema.methods.toJSON = function () {
    let obj = this.toObject();
    delete obj.password;
    return obj
};

const User = mongoose.model('User', userSchema);

async function findUser(username){
    const user = await User.findOne({
        username: username
    });

    return user
}

router.post('/', async (req, res) => {

    // Validate
    if(!req.body.username || !req.body.password){
        return res.status(400)
            .send({
                message: "Username and password are required."
            });
    }

    try {
        if(await findUser(req.body.username)){
            return res.sendStatus(403)
                .send({
                    message: "Username already in use."
                });
        }

        // create a new user and save it to the database
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: req.body.password,
            role: ADMIN_ROLE
        });

        await user.save();

        return res.send({
            user: user
        })

    } catch (e) {
        console.log(e);
        return res.sendStatus(500)
    }
});

router.post('/login', async (req, res) => {
    if(!req.body.username || !req.body.password){
        return res.status(400)
            .send({
                message: "Username and password are required."
            });
    }

    const usernamePassWrong = "Username and password are wrong.";

    try {
        let user = findUser(req.body.username);
        // If the user doesn't exist return 403
        if(!user){
            return res.status(403)
                .send({
                    message: usernamePassWrong
                })
        }

        // If the password doesn't match return 403
        if(!await user.comparePassword(req.body.password)){
            return res.status(403)
                .send({
                    message: usernamePassWrong
                })
        }


        return res.send({
            user: user
        })
    } catch (e) {
        console.log(e);
        return res.status(500);
    }
});

module.exports = {
    routes: router,
    model: User
};




