const express = require("express");

const app = express();
const port = 8080;

const userRoute = require('./routes/User');
const loginRouter = require('./routes/Login');
const signUpRouter = require('./routes/signUp')

const { createDatabaseIfNotExists } = require('./database/database');

//Middleware to get the body of POST request
//app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Route
app.use('/user', userRoute);
app.use('/login', loginRouter);
app.use('/signUp', signUpRouter);

createDatabaseIfNotExists();

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});