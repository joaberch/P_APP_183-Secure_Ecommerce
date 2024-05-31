const { getUsername } = require('../database/database');
const jwt = require('jsonwebtoken');

module.exports = {
    get: async (req, res) => {
        try {
            const user = await getUsername(req.params.user);

            if (!user) {throw new Error('User not found');}

            let decodedToken = 

            res.send(`
            Id : ${user.id}<br>
            User: ${user.username},<br>
            Created at: ${user.created_at}
            `);

        } catch (err) {
            res.status(404).send("" + err);
        }
    }
};