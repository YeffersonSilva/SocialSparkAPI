// Import dependencies
const jwt = require('jwt-simple');
const moment = require('moment');
require('dotenv').config();

// Secret key for JWT
const SECRET_KEY = process.env.SECRET_KEY_JWT;

// Function to generate a JWT token
const createToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        surname: user.surname,
        nick: user.nick,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix() // Token expires in 30 days
    };

    // Return the encoded token
    return jwt.encode(payload, SECRET_KEY);
};

module.exports = {
    SECRET_KEY,
    createToken
};
