const express = require("express");

const app = express();
const userRouter = require('./routes/User');
const loginRouter = require('./routes/login');
const createAccountRouter = require('./routes/createAccount');
const database = require('./database/database');

//user route
app.use('/user', userRouter);

//login route
app.use('/login', loginRouter);

//create account route
app.use('/create', createAccountRouter);

const port = 8080;

//database.connect()

//Error 404 if the URL don't exist
app.use(({ res }) => {
    const message = "Unable to find the requested resource! Try another URL.";
    res.status(404).json(message);
});

// Démarrage du serveur
app.listen(port, () => {
    console.log('Server running on port', port);
});