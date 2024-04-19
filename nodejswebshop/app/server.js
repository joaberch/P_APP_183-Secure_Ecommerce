const express = require("express");

const app = express();
const userRouter = require('./routes/User');
const loginRouter = require('./routes/login')
const mysql2 = require('mysql2')
const https = require('https')

//user route
app.use('/user', userRouter);

//login route
app.use('/login', loginRouter);

const port = 443;

//Connection information
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'db_test'
};

//Connection to the database
const connectToDatabase = async () => {
    try {
        const connection = await mysql2.createConnection(dbConfig);
        //console.log(connection)
        return connection;
    } catch (error) {
        console.log('erreur lors de la connexion à la db')
    }
}

connectToDatabase()
//console.log(connection)
//Query
//const query = connection.query('SELECT * FROM t_users')
//console.log(query)

//End the connection
//connection.end();

//Error 404 if the URL don't exist
app.use(({ res }) => {
    const message = "Unable to find the requested resource! Try another URL.";
    res.status(404).json(message);
});

// Démarrage du serveur
// https.createServer(app).listen(port, () => {console.log('Server running on port', port)})
app.listen(port, () => {
    console.log('Server running on port', port);
});