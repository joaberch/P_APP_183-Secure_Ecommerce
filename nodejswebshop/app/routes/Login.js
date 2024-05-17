const express = require('express');

const loginRouter = express.Router();

const {checkIfUserExist} = require('../database/database')

loginRouter.post('/', (req, res) => {
    const {username, password} = req.body;

    //Check if the username is in the database
    checkIfUserExist(username)
    //TODO - generate JWT token
    //TODO - check in the database
    //if the user exist
    //then get the salt in the database
    //then add the salt at the end of the password and hash it
    //then check if the hashed password match the one in the database

    //end
    //res.redirect(`/user/${username}`)
})

module.exports = loginRouter; 