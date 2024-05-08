const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require('../../services/jwt');

exports.login = (req, res) => {
    // Obtener los parámetros del cuerpo de la solicitud
    let params = req.body;
  
    if (!params.email || !params.password) {
      return res.status(400).send({
        status: "error",
        message: "All fields are required",
      });
    }
  
    // Buscar usuario en la base de datos
    User.findOne({ email: params.email })
      //.select({ password: 0 })
      .exec((err, user) => {
        if (err || !user) {
          return res.status(500).json({
            status: "error",
            message: "Error in the request",
          });
        }
  
        //check if password is correct
        let pwd = bcrypt.compareSync(params.password, user.password);
        if (!pwd) {
          return res.status(400).json({
            status: "error",
            message: "Incorrect password",
          });
        }
  
        // return token
        const token = jwt.createToken(user);
        // return data is user
  
        return res.status(200).json({
          status: "success",
          message: "User logged in successfully",
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            nick: user.nick,
          },
          token,
        });
      });
  };