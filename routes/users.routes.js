const express = require('express');
const router = express.Router();
const authlogin = require('../middlewares/authLoginUserMiddleware');
const auth = require('../middlewares/authMiddlewares');
const UserController = require('../controllers/users.controllers');
const userController = new UserController();

router.post('/signup', authlogin, userController.signup);
router.post('/login', auth,userController.login);

module.exports = router;