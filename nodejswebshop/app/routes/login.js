const express = require('express');
const sha256 = require('crypto-js/sha256');

const loginRouter = express.Router();

loginRouter.post('/', (req, res) => {
    //Check if the user exist in the database
    try {
        const username = req.body.username;
        console.log(username)
        // const checkUsername = connection.query("SELECT 'name' FROM 't_users' WHERE name = " + username)
        if (checkUsername) {
            //get Salt from the database
            const Salt = 'TODO'

            //Hash the password sent
            const password = sha256(req.body.username + Salt)

            //check if the password match the one in the database

            //end the connection
            // connection.end();
        }
    } catch (error) {

    }
})

module.exports = loginRouter;