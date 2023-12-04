const express = require('express');
const router = express.Router();
const authlogin = require('../middlewares/authLoginUserMiddleware');
const auth = require('../middlewares/authMiddlewares');
const UserController = require('../controllers/users.controllers');
const userController = new UserController();

router.post('/signup', authlogin, userController.signup);
router.post('/login', authlogin,userController.login);
router.post('/emailcheck',userController.emailCheck);
router.post('/emailcheck/auth', userController.certification);
router.get('/surfing', userController.surfing);
router.get('/myhome/:userId', userController.myhome);
router.put('/myhome/:userId', auth, userController.intro);
router.post('/logout',auth,userController.logout);
module.exports = router;