const express = require('express');
const jwt = require('jsonwebtoken');

const loginRouter = express.Router();

const { checkIfUserExist } = require('../database/database')

loginRouter.post('/', (req, res) => {
    const { username, password } = req.body;

    giveJWTToken(req, res, username, password);
    //end
    //res.redirect(`/user/${username}`)
})

async function giveJWTToken(req, res, username, password) {
    //Check if the username is in the database
    if (await checkIfUserExist(username, password)) //TODO - connection.execute
    {
        let token = jwt.sign({ username: username }, "secretKey", { expiresIn: '1h' });

        res.cookie('jwt', token, { httpOnly: true, secure: true });
        res.status(200).send('JWT token generated and stored in cookie, ' + token);
    } else {
        console.log("username or password incorrect")
    }
}

module.exports = loginRouter; 