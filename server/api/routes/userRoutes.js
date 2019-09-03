const router = require('express').Router();
const passport = require('passport');
const createUserController = require('../controllers/user/create');
const deleteUserController = require('../controllers/user/delete');
const editUserController = require('../controllers/user/edit');
const infoUserController = require('../controllers/user/info');
const validation = require('../controllers/validation');
const upload = require('../middlewares/uploadMiddleware');
router.post('/signup', validation.signUp, createUserController.signUp);
router.post('/signin', createUserController.signIn);

router.get(
    '/singleUserInfo',
    passport.authenticate('jwt', {
        session: false
    }),
    infoUserController.getUserInfo
);

router.get(
    '/getUserProjects',
    passport.authenticate('jwt', {
        session: false
    }),
    infoUserController.getUserProjects
);
router.post('/confirmEmail', createUserController.confirmEmail);
router.post('/forgotpassword', editUserController.forgotPassword);
router.post('/changepassword', editUserController.changePassword);

router.delete(
    '/deleteuser',
    passport.authenticate("jwt", {
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

router.post(
    '/editProfile',
    passport.authenticate('jwt', {
        session: false
    }),
    upload.single('avatar'),
    editUserController.editProfile
);

module.exports = router