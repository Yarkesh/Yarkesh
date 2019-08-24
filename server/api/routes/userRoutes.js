const router = require('express').Router();
const passport = require('passport');
const userController = require('../controllers/userController');
const validation = require('../controllers/validation');

router.post('/signup', validation.signUp, userController.signUp);
router.post('/signin', userController.signIn);

router.get(
    '/singleUserInfo',
    passport.authenticate('jwt', {
        session: false
    }),
    userController.getUserInfo
);

router.get(
    '/getUserProjects',
    passport.authenticate('jwt', {
        session: false
    }),
    userController.getUserProjects
);
router.post('/confirmEmail', userController.confirmEmail);
router.post('/forgotpassword', userController.forgotPassword);
router.post('/changepassword', userController.changePassword);

router.delete(
    '/deleteuser',
    passport.authenticate("jwt", {
        session: false
    }),
    userController.deleteUser
);

router.post(
    '/searchuser',
    passport.authenticate('jwt', {
        session: false
    }),
    userController.searchUsers
);

module.exports = router