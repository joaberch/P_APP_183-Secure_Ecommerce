const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        const message = `You have not provided an authentication token. Add one to the request header.`;
        return res.status(401).json({ message });
    } else {
        const token = authorizationHeader.split(" ")[1];
        const decodedToken = jwt.verify(token,
            "secretKey",
            (error, decodedToken) => {
                if (error) {
                    const message = `The user is not authorized to access this resource.`;
                    return res.status(401).json({ message, data: error });
                }
                const userId = decodedToken.userId;
                if (req.body.userId && req.body.userId !== userId) {
                    const message = `User ID is invalid`;
                    return res.status(401).json({ message });
                } else {
                    next();
                }
            }
        );
    }
};
module.exports = auth;