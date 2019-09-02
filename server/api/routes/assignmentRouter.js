const router = require('express').Router();
const passport = require('passport');
const authenticateRoutes = require('../middlewares/authentication');
// const assignmentController = require('../controllers/assignmentController');
const createAssignmentController = require('../controllers/assignment/create');
const infoAssignmentController = require('../controllers/assignment/info');

router.post(
    '/createassignment',
    passport.authenticate('jwt', {
        session: false
    }),
    authenticateRoutes.isCreator,
    createAssignmentController.createAssignment
);

router.post(
    '/getstoryassignments',
    passport.authenticate('jwt', {
        session: false
    }),
    authenticateRoutes.isMember,
    infoAssignmentController.getStoryAssignments
);


module.exports = router;
