const express = require('express');

const createAccountRouter = express.Router();

createAccountRouter.post('/', (req, res) => {
    // database.connect();
    // database.createAccount();
    return res.status(200)
})

module.exports = createAccountRouter;