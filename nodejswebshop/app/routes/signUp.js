const express = require('express');
const jwt = require('jsonwebtoken');
const auth = require('../auth/auth');

const signUpRouter = express.Router();

const { signUp } = require('../database/database')

signUpRouter.post('/', (req, res) => {
    const { username, password } = req.body;
    signUp(username, password);

    let token = jwt.sign({ username: username }, "secretKey", { expiresIn: '1h' });

    res.cookie('jwt', token, { httpOnly: true, secure: true });
    res.status(200).send('user created successfully, JWT token generated and stored in cookie, ' + token);
    //end
    //res.redirect(`/user/${username}`)
})

module.exports = signUpRouter; 