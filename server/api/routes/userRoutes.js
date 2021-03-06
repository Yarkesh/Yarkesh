const router = require('express').Router();
const passport = require('passport');
const createUserController = require('../controllers/user/create');
const deleteUserController = require('../controllers/user/delete');
const editUserController = require('../controllers/user/edit');
const infoUserController = require('../controllers/user/info');
const signUpValidation = require('../validators/userValidator/signUp');
const signInValidation = require('../validators/userValidator/signIn');
const confirmEmailValidation = require('../validators/userValidator/confirmEmail');
const forgotPasswordValidation = require('../validators/userValidator/forgotPassword');
const changePasswordValidation = require('../validators/userValidator/changePassword');
const searchUserValidator = require('../validators/userValidator/userSearch');
const editPasswordValidator = require('../validators/userValidator/editPassword');
const errorHandler = require('../controllers/errorHandler');
const editUserValidator = require('../validators/userValidator/editUser');

const upload = require('../middlewares/uploadMiddleware');

router.post('/signup', signUpValidation.Validator, errorHandler.isValid, createUserController.signUp);
router.post('/signin', signInValidation.Validator, errorHandler.isValid, createUserController.signIn);
router.post('/confirmEmail', confirmEmailValidation.Validator, errorHandler.isValid, createUserController.confirmEmail);
router.post('/forgotpassword', forgotPasswordValidation.Validator, errorHandler.isValid, editUserController.forgotPassword);
router.post('/changepassword', changePasswordValidation.Validator, errorHandler.isValid, editUserController.changePassword);
router.post(
    '/searchuser',
    passport.authenticate('jwt', {
        session: false
    }),
    searchUserValidator.Validator,
    errorHandler.isValid,
    infoUserController.searchUsers
);
router.post(
    '/editpassword',
    passport.authenticate('jwt', {
        session: false
    }),
    editPasswordValidator.Validator,
    errorHandler.isValid,
    editUserController.editPassword
);

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



router.post(
    '/editProfile',
    passport.authenticate('jwt', {
        session: false
    }),
    upload.single('avatar'),
    editUserValidator.Validator,
    errorHandler.isValid,
    editUserController.editProfile
);


module.exports = router;