const express = require("express");

const app = express();
const port = 8080;

const userRoute = require('./routes/User');

const { createDatabaseIfNotExists } = require('./database/database');
app.use('/user', userRoute);

createDatabaseIfNotExists();

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});