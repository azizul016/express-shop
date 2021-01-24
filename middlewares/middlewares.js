// module.exports.first = function (req, res, next) {
//     console.log('1st middleware');
//     next();
// }

// module.exports.second = function (req, res, next) {
//     console.log('2nd middleware');
//     next();
// }

// module.exports.third = function (req, res, next) {
//     console.log('3rd middleware');
//     return res.send('Done');
// }

const jwt = require('jsonwebtoken');

//authenticated middleware;

module.exports.isAuthenticated = async (req, res, next) => {
  try {
    const verified = await jwt.verify(req.headers.token, 'secret');
    if (!verified) {
      return res.status(400).json({
        error: true,
        data: null,
        token: null,
        message: 'user not authenticated',
      });
    }
    next();
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      error: e.message,
      data: undefined,
      token: undefined,
      message: 'something went wrong',
    });
  }
};
