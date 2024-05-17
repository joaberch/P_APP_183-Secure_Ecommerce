const mysql = require('mysql2');
const crypt = require('crypto-js')

const dbConfiguration = {
    host: 'db',
    user: 'root',
    password: 'root',
};

async function checkIfUserExist(username) {
    const connection = await mysql.createConnection(dbConfiguration);
    try {
        // Select the database 'db_secure_shop'
        await connection.promise().query("USE db_secure_shop");

        const [rows] = await connection.promise().query(`SELECT * FROM user WHERE username = '${username}'`);
        if (rows.length === 0) {
            console.log("username or password invalid")
        } else {
            console.log("This username exist")

            const [queryResult, u] = await connection.promise().query(`SELECT salt FROM user WHERE username = '${username}'`);
            const salt = queryResult[0].salt;
            const hashedPassword = crypt.SHA256(username + salt);
            console.log(hashedPassword)

            const [rows] = await connection.promise().query(`SELECT * FROM user WHERE password_hash = '${hashedPassword}'`);
            if (rows.length === 0) {
                console.log("wrong password")
            } else {
                console.log("correct password")
            }
        }
    } catch (error) {
        console.log("error : " + error)
    }
}

async function createDatabaseIfNotExists() {
    const connection = await mysql.createConnection(dbConfiguration);
    try {
        // check if the database 'db_secure_shop' exist
        const [rows] = await connection.promise().query("SHOW DATABASES LIKE 'db_secure_shop'");
        if (rows.length === 0) {
            // If the database doesn't exist
            await connection.promise().query("CREATE DATABASE db_secure_shop");
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
        // Select the database 'db_secure_shop'
        await connection.promise().query("USE db_secure_shop");
        // Create the table 'user' if it doesn't already exist
        await connection.promise().query(`CREATE TABLE IF NOT EXISTS user (
                id INT PRIMARY KEY AUTO_INCREMENT,
                username VARCHAR(50) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                salt VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log("Table 'user' created or alredy exist");
    } catch (error) {
        console.error("Error creating table 'user' : ", error);
    }
}

async function signUp(username, password) {
    const connection = await mysql.createConnection(dbConfiguration);
    try {
        // Select the database 'db_secure_shop'
        await connection.promise().query("USE db_secure_shop");

        //Check if the username is not already taken
        const [rows] = await connection.promise().query(`SELECT * FROM user WHERE username = '${username}'`);
        if (rows.length === 0) {
            let salt = crypto.randomUUID(16);
            let hashedPassword = crypt.SHA256(username + salt);

            //insert in the database
            await connection.promise().query(`INSERT INTO user (username, password_hash, salt) VALUES ('${username}', '${hashedPassword}', '${salt}')`);
            console.log("User has been created")
        } else {
            console.log("username is already taken")
        }

    } catch (error) {
        console.log("error : " + error)
    }
}

module.exports = { createDatabaseIfNotExists, checkIfUserExist, signUp };