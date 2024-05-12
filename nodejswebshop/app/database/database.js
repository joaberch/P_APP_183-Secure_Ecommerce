const mysql = require('mysql2');

const dbConfiguration = {
    host: 'db',
    user: 'root',
    password: 'root',
};

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
        console.log("Table 'user' created or was alredy created");
    } catch (error) {
        console.error("Error creating table 'user' : ", error);
    }
}


module.exports = { createDatabaseIfNotExists };