const express = require('express');
const jwt = require('jsonwebtoken');

const loginRouter = express.Router();

const { checkIfUserExist } = require('../database/database')

loginRouter.post('/', (req, res) => {
    const { username, password } = req.body;

    giveJWTToken(username, password);
    //end
    //res.redirect(`/user/${username}`)
})

async function giveJWTToken(username, password) {
    //Check if the username is in the database
    if (await checkIfUserExist(username, password)) //TODO - connection.execute
    {
        console.log("give JWT token")
        let token = jwt.sign({username: username}, "secretKey");
        console.log(token)
        //TODO - generate JWT token
    } else {
        console.log("username or password incorrect")
    }
}

module.exports = loginRouter; 