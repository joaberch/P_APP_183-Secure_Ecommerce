
const mysql = require('mysql2');

//Create a connection to the MySQL database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'db_authentication',
    port: 6033,
});

module.exports = {
connect: function connectToDB() {
// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});
},

close: function closeConnection() {
    connection.close();
},

createAccount: function createAccount() {
    connection.query('SELECT * FROM t_users')
}
}