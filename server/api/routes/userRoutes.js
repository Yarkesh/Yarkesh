const router = require('express').Router();
const userController = require('../controllers/userController');
const validation = require('../controllers/validation')
const passport = require('passport')

router.post(
    '/signup',
    validation.signUp,
    userController.signUp
);
router.post(
    '/signin',
    userController.signIn
);

router.get(
    '/singleUserInfo',
    passport.authenticate("jwt", { session: false }),
    userController.getUserInfo
);

router.get(
    '/getUserProjects',
    passport.authenticate("jwt", { session: false }),
    userController.getUserProjects
);

module.exports = router