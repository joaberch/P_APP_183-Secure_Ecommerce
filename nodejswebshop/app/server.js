const express = require("express");

const app = express();
const userRouter = require('./routes/User');
const loginRouter = require('./routes/login');
const mysql = require('mysql2');

//user route
app.use('/user', userRouter);

//login route
app.use('/login', loginRouter);

const port = 443;

//Create a connection to the MySQL database
const connection = mysql.createConnection({
    host: 'localhost', // change to your mysql server ip
    user: 'root', //change to your mysql user
    password: 'root', // change to your mysql user password
    database: 'db_test', // change to your database name
    port: 6033,
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Perform database operations here

// Close the connection when done
connection.end();

//Error 404 if the URL don't exist
app.use(({ res }) => {
    const message = "Unable to find the requested resource! Try another URL.";
    res.status(404).json(message);
});

// Démarrage du serveur
app.listen(port, () => {
    console.log('Server running on port', port);
});