const User = require("../models/User.js");
const bcrypt = require("bcrypt");

const jwt = require("../services/jwt.js");
const mongosePagination = require("mongoose-pagination");

const testUser = (req, res) => {
  return res.status(200).json({
    message: "Hello world user",
  });
};











module.exports = { testUser, register, login, profile, list ,update};
