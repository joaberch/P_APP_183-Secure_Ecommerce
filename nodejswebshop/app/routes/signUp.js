const express = require('express');

const signUpRouter = express.Router();

const {signUp} = require('../database/database')

signUpRouter.post('/', (req, res) => {
    const {username, password} = req.body;

    signUp(username, password);

    //end
    //res.redirect(`/user/${username}`)
})

module.exports = signUpRouter; 