const userService = require("../services/user.service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// hashing password
// hashPassword = (password, saltRound) => {
//   return new Promise((resolve, reject) => {
//     bcrypt.hash(password, saltRound, (err, hash) => {
//       if (err) reject(err);
//       resolve(hash);
//     });
//   });
// };

const hashPassword = (password, saltRound) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRound, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
};

module.exports.register = async (req, res, next) => {
  try {
    const { body } = req;
    const saltRound = bcrypt.genSaltSync(10);
    body.password = await hashPassword(body.password, saltRound);
    const user = await userService.createUser(body);
    const userObj = JSON.parse(JSON.stringify(user));
    delete userObj.password;
    // console.log(userObj)

    const token = await jwt.sign(
      {
        data: userObj,
      },
      "secret",
      {
        expiresIn: "24h",
      }
    );

    return res.status(200).json({
      error: false,
      data: null,
      token: token,
      message: "registration completed",
    });
  } catch (e) {
    return res.status(500).json({
      error: e,
      data: null,
      token: null,
      message: "something went wrong",
    });
  }
};

//login controller
const comparePassword = (password, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, match) => {
      if (err) reject(err);
      resolve(match);
    });
  });
};

module.exports.login = async (req, res, next) => {
  try {
    const user = await userService.findUserByEmail(req.body.email);
    const matchPassword = await comparePassword(
      req.body.password,
      user.password
    );
    if (!matchPassword) {
      return res.status(400).json({
        error: false,
        data: null,
        token: null,
        message: "User credentials didn't matched",
      });
    }
    const userObj = JSON.parse(JSON.stringify(user));
    delete userObj.password;

    const token = await jwt.sign(
      {
        data: userObj,
      },
      "secret",
      {
        expiresIn: "24h",
      }
    );

    return res.status(200).json({
      error: false,
      data: null,
      token: token,
      message: "login successful",
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      error: e,
      data: null,
      token: null,
      message: "something went wrong",
    });
  }
};
