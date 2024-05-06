//impot dependencies
const jwt = require('jwt-simple');
const moment = require('moment');
require('dotenv').config();

//ket secret
const SECRET_KEY = process.env.SECRET_KEY_JWT;

// create a function to generate a token
const createToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        surname: user.surname,
        nick: user.nick,
        email: user.email,
        role: user.role,
        imagen: user.image,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix()
    };

// retur jwt token code
    return jwt.encode(payload, SECRET_KEY);
};

module.exports = {
    createToken
};