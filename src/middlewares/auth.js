const jwt = require('jwt-simple');
const moment = require('moment');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY_JWT;

exports.auth = (req, res, next) => {
    // Check if the authorization header exists
    if (!req.headers.authorization) {
        return res.status(403).send({
            status: "error",
            message: 'The request does not have the authentication header'
        });
    }

    // Extract and clean the token
    let token = req.headers.authorization.replace(/['"]+/g, '');

    try {
        // Decode the token
        var payload = jwt.decode(token, SECRET_KEY);

        // Check if the token has expired
        if (payload.exp <= moment().unix()) {
            return res.status(401).send({
                status: "error",
                message: 'The token has expired'
            });
        }

        // Attach user data to the request
        req.user = payload;
    } catch (error) {
        return res.status(401).send({
            status: "error",
            message: 'The token is invalid'
        });
    }

    // Proceed to the next middleware or route handler
    next();
};
