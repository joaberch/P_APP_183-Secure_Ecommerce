const express = require('express');

const loginRouter = express.Router();

const {checkIfUserExist} = require('../database/database')

loginRouter.post('/', (req, res) => {
    const {username, password} = req.body;

    //Check if the username is in the database
    if(checkIfUserExist(username, password)) //TODO - connection.execute
        {
            console.log("give JWT token")
            //TODO - generate JWT token
        } else {
            console.log("error")
        }

    //end
    //res.redirect(`/user/${username}`)
})

module.exports = loginRouter; 