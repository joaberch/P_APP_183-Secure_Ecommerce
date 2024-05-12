const express = require('express');

const loginRouter = express.Router();

loginRouter.post('/', (req, res) => {
    const {username, password} = req.body;

    //TODO - generate JWT token
    //TODO - check in the database

    //end
    //res.redirect(`/user/${username}`)
})

module.exports = loginRouter; 