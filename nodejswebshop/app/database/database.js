const mysql = require('mysql2/promise');
const cryptoJs = require('crypto-js');
const crypto = require('crypto');

//value required to connect to the database
const dbConfiguration = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'db_secure_shop',
};

//Check if the user exist in the database
async function checkIfUserExist(username, password) {
    //Create the connection
    const connection = await mysql.createConnection(dbConfiguration);
    try {
        //Check if the username already exist
        const [rows] = await connection.execute(`SELECT * FROM user WHERE username = ?`, [username]);
        if (rows.length === 0) {
            return false;
        } else {

            const [result, u] = await connection.execute(`SELECT salt FROM user WHERE username = ?`, [username]);
            const salt = result[0].salt;
            const hashedPassword = cryptoJs.SHA256(username + password + salt).toString();

            const [passwordRows] = await connection.execute(`SELECT * FROM user WHERE password_hash = ?`, [hashedPassword]);
            if (passwordRows.length === 0) {
                return false;
            } else {
                return true;
            }
        }
    } catch (error) {
        console.log("error : " + error);
        return false;
    }
}

async function createDatabaseIfNotExists() {
    const connection = await mysql.createConnection(dbConfiguration);
    try {
        // check if the database 'db_secure_shop' exist
        const [rows] = await connection.execute("SHOW DATABASES LIKE 'db_secure_shop'");
        if (rows.length === 0) {
            // If the database doesn't exist
            await connection.execute("CREATE DATABASE db_secure_shop");
            console.log("Database 'db_secure_shop' created");
        } else {
            //If the database exists
            console.log("Database 'db_secure_shop' already exists");
        }
        //Create the table if it doesn't already exist
        await createTableIfNotExists(connection);
    } catch (error) {
        console.error("Error creating or checking database : ", error);
    }
}

async function createTableIfNotExists(connection) {
    try {
        // Create the table 'user' if it doesn't already exist
        await connection.execute(`CREATE TABLE IF NOT EXISTS user (
                id INT PRIMARY KEY AUTO_INCREMENT,
                username VARCHAR(50) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                salt VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log("Table 'user' created or already exist");
    } catch (error) {
        console.error("Error creating table 'user' : ", error);
    }
}

async function signUp(username, password) {
    const connection = await mysql.createConnection(dbConfiguration);
    try {
        //Check if the username is not already taken
        const [rows] = await connection.execute(`SELECT * FROM user WHERE username = ?`, [username]);
        if (rows.length === 0) {
            let salt = crypto.randomBytes(16).toString('hex');
            let hashedPassword = cryptoJs.SHA256(username + password + salt);

            //insert in the database
            await connection.execute(`INSERT INTO user (username, password_hash, salt) VALUES (?, ?, ?)`, [username, hashedPassword, salt]);
            console.log("User has been created")
        } else {
            console.log("username is already taken")
        }

    } catch (error) {
        console.log("error : " + error)
    }
}

module.exports = { createDatabaseIfNotExists, checkIfUserExist, signUp };