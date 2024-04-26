const express = require('express');
const database = require('../database/database');

const createAccountRouter = express.Router();

createAccountRouter.post('/', (req, res) => {
    database.connect();
    database.createAccount();
    console.log("a")
    return res.status(200)
})

module.exports = createAccountRouter;