// imports module
const jwt = require('jwt-simple');

const moment = require('moment');
// secret key
require('dotenv').config();

//ket secret
const SECRET_KEY = process.env.SECRET_KEY_JWT;
//Middlwares the autehnticate user
exports.auth = (req, res, next) => {    


// check if the token is valid

    if  (!req.headers.authorization) {
        return res.status(403).send({ status:"eror", message: 'The request does not have the authentication header' });
    }

    
// incripted token

    let token = req.headers.authorization.replace(/['"]+/g, '');

    try {
        var payload = jwt.decode(token, SECRET_KEY);
        if (payload.exp <= moment().unix()) {
            return res.status(404).send({ status:"error", message: 'The token has expired' });
        }
    }catch (error) {
        return res.status(404).send({ status:"error", message: 'The token is invalid' });
    }



// add data is user request

    req.user = payload;
    next();

};
