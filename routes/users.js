const express = require('express');
const router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a user routes');
// });

// router.get('/id', function (req, res, next) {
//   res.send('Id route')
// })

const userController = require('../controllers/user.controller');

router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;
