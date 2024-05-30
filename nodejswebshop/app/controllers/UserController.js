const { getUsername } = require('../database/database');

module.exports = {
    get: async (req, res) => {
        try {
            const user = await getUsername(req.params.user);

            if (!user) {throw new Error('User not found');}

            res.send(`
            Id : ${user.id}<br>
            User: ${user.username},<br>
            Hashed password: ${user.password_hash},<br>
            Salt: ${user.salt},<br>
            Created at: ${user.created_at}
            `);

        } catch (err) {
            res.status(404).send("" + err);
        }
    }
};