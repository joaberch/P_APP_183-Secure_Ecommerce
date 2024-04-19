const express = require('express');
const { use } = require('./User');
const sha256 = require('crypto-js/sha256');
const Base64 = require('crypto-js/enc-base64');
const mysql2 = require('mysql2')
const jwt = require('jsonwebtoken')

const loginRouter = express.Router();

loginRouter.post('/', (req, res) => {
    //Connection to the database
    const connection = mysql2.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'db_test',
        port: 6033
    })
    //Connection to the database
    connection.connect();

    //Check if the user exist in the database
    try {
        const username = req.body.username;
        const checkUsername = connection.query("SELECT 'name' FROM 't_users' WHERE name = " + username)
        if (checkUsername) {
            //get Salt from the database
            const Salt = 'TODO'

            //Hash the password sent
            const password = sha256(req.body.username + Salt)

            //check if the password match the one in the database

            //end the connection
            connection.end();
        }
    } catch (error) {

    }
})

module.exports = loginRouter;