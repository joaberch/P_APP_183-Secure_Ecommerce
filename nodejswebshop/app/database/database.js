const net = require("net")

const client = net.createConnection({port: '6033'}, () => {
    console.log("connected")
})

module.exports = {
    connect: function connectToDB() {
        // Connect to the database
        net.connect((err) => {
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