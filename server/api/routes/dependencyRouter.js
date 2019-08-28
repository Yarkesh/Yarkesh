const router = require('express').Router();
const passport = require('passport');
const authenticateRoutes = require('../middlewares/authentication');
// const dependencyController = require('../controllers/dependencyController');
const createDependencyController = require('../controllers/dependency/create');
const infoDependencyController = require('../controllers/dependency/info');
// const Validation = require('../controllers/validation');

router.post(
    '/createdependency',
    passport.authenticate('jwt', {
        session: false
    }),
    authenticateRoutes.isMember,
    // Validation.dependency,
    createDependencyController.createDependency
);

router.post(
    '/getstorydependencies',
    passport.authenticate('jwt', {
        session: false
    }),
    authenticateRoutes.isMember,

    infoDependencyController.getStoryDependencies
);


module.exports = router;