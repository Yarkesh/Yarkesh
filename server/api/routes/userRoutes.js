const router = require('express').Router();
const passport = require('passport');
const userController = require('../controllers/userController');
const validation = require('../controllers/validation');

router.post('/signup', validation.signUp, userController.signUp);
router.post('/signin', userController.signIn);

router.get(
<<<<<<< HEAD
	'/singleUserInfo',
	passport.authenticate('jwt', { session: false }),
	userController.getUserInfo
);

router.get(
	'/getUserProjects',
	passport.authenticate('jwt', { session: false }),
	userController.getUserProjects
=======
    '/singleUserInfo',
    passport.authenticate("jwt", {
        session: false
    }),
    userController.getUserInfo
);

router.post(
    '/getUserProjects',
    passport.authenticate("jwt", {
        session: false
    }),
    userController.getUserProjects
>>>>>>> meti
);
router.post('/confirmEmail', userController.confirmEmail);
router.post('/forgotpassword', userController.forgotPassword);
router.post('/changepassword', userController.changePassword);

<<<<<<< HEAD
module.exports = router;
=======
router.delete(
    '/deleteuser',
    passport.authenticate("jwt", {
        session: false
    }),
    userController.deleteUser
);

module.exports = router
>>>>>>> meti
