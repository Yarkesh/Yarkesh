const router = require('express').Router();
const passport = require('passport');
const authenticateRoutes = require('../middlewares/authentication');
const assignmentController = require('../controllers/assignmentController');

router.post(
    '/createassignment',
    passport.authenticate('jwt', {
        session: false
    }),
    authenticateRoutes.isCreator,
    assignmentController.createAssignment
);

router.post(
    '/getstoryassignments',
    passport.authenticate('jwt', {
        session: false
    }),
    authenticateRoutes.isMember,
    assignmentController.getStoryAssignments
);


module.exports = router;