const express = require("express");

const app = express();
const port = 8080;

const userRoute = require('./routes/User');
const loginRouter = require('./routes/Login');

const { createDatabaseIfNotExists } = require('./database/database');

//Middleware to get the body of POST request
app.use(express.urlencoded({ extended: true }));

//Route
app.use('/user', userRoute);
app.use('/login', loginRouter);

createDatabaseIfNotExists();

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});