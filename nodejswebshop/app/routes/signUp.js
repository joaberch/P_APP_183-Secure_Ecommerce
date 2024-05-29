const express = require('express');

const signUpRouter = express.Router();

const {signUp} = require('../database/database')

signUpRouter.post('/', (req, res) => {
    const {username, password} = req.body;
    signUp(username, password);

    res.status(200).send('user created successfully');
    //end
    //res.redirect(`/user/${username}`)
})

module.exports = signUpRouter; 