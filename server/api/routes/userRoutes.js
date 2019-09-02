const router = require('express').Router();
const passport = require('passport');
// const userController = require('../controllers/userController');
const createUserController = require('../controllers/user/create');
const deleteUserController = require('../controllers/user/delete');
const editUserController = require('../controllers/user/edit');
const infoUserController = require('../controllers/user/info');
const validation = require('../controllers/validation');

const upload = require('./uploadMiddleware');
const Resize = require('./Resize');
const path = require('path');
const multer = require('multer');
const gcsSharp = require('multer-sharp');

// const storage = multer({
//     filename: (req, file, cb) => {
//         cb(null, 'req.user.userId' + '.' + 'req.user.userName' + '.' + file.originalname);
//     },
//     destination: function (req, file, cb) {
//         cb(null, __dirname + '../../../pictures/')
//     }
// })



// multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, __dirname + '../../../pictures/')
//     },
//     filename: function (req, file, cb) {
//         cb(null, req.user.userId + '.' + req.user.userName + '.' + file.originalname);
//     }
// })

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//         cb(null, true);
//     }
//     else {
//         cb(null, false);
//     }
// }


// const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1024 * 1024 / 2
//     },
//     fileFilter: fileFilter
// })

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
    '/updateAvatar',
    // passport.authenticate('jwt', {
    //     session: false
    // }),
    upload.single('avatar'), async function (req, res) {
        const imagePath = path.join(__dirname, '../../pictures');
        const fileUpload = new Resize(imagePath);
        if (!req.file) {
            res.status(401).json({ error: 'Please provide an image' });
        }
        const filename = await fileUpload.save(req.file.buffer);
        return res.status(200).json({ name: filename });
    }
);

module.exports = router