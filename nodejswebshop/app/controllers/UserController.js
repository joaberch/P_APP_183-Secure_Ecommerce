module.exports = {
    get: (req, res) => {
        const username = req.params.user;
        res.send(`User: ${username}`);
    }
};