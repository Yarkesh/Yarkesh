const router = require('express').Router();
const passport = require('passport');
const createUserController = require('../controllers/user/create');
const deleteUserController = require('../controllers/user/delete');
const editUserController = require('../controllers/user/edit');
const infoUserController = require('../controllers/user/info');
const signUpValidation = require('../validators/userValidator/signUpValidator');
const signInValidation = require('../validators/userValidator/signInValidator');
const confirmEmailValidation = require('../validators/userValidator/confirmEmailValidator');
const forgotPasswordValidation = require('../validators/userValidator/forgotPasswordValidator');
const changePasswordValidation = require('../validators/userValidator/changePasswordValidator');
const authenticateRoutes = require('../middlewares/authentication');
const upload = require('../middlewares/uploadMiddleware');

router.post('/signup', signUpValidation.signUp, createUserController.signUp);
router.post('/signin', signInValidation.signIn, createUserController.signIn);
router.post('/confirmEmail', confirmEmailValidation.confirmEmail, createUserController.confirmEmail);
router.post('/forgotpassword', forgotPasswordValidation.forgotPassword, editUserController.forgotPassword);
router.post('/changepassword', changePasswordValidation.changePassword, editUserController.changePassword);

router.get(
    '/singleUserInfo',
    passport.authenticate('jwt', {
        session: false
    }),
    infoUserController.getUserInfo
);

router.get(
    '/getavatar',
    passport.authenticate('jwt', {
        session: false
    }),
    infoUserController.getAvatar
);

router.get(
    '/getUserProjects',
    passport.authenticate('jwt', {
        session: false
    }),
    infoUserController.getUserProjects
);

router.delete(
    '/deleteuser',
    passport.authenticate('jwt', {
        session: false
    }),
    deleteUserController.deleteUser
);

router.post(
    '/searchuser',
    passport.authenticate('jwt', {
        session: false
    }),
    infoUserController.searchUsers
);

router.get(
    '/findlatenotconfirmedusers',
    deleteUserController.findLateNotConfirmedUsers
);

router.post(
    '/editProfile',
    passport.authenticate('jwt', {
        session: false
    }),
    upload.single('avatar'),
    editUserController.editProfile
);

router.post(
    '/inviteMember',
    passport.authenticate('jwt', {
        session: false
    }),
    authenticateRoutes.isMember,
    createUserController.inviteMember
)

// router.post(
//     '/editproject',
//     passport.authenticate('jwt', {
//         session: false
//     }),
//     editUserController.editPassword
// );

module.exports = router;