const router = require('express').Router();
const passport = require('passport');
// const sprintController = require('../controllers/sprintController');
const authenticateRoutes = require('../middlewares/authentication');
const createMilestoneController = require('../controllers/milestone/create');
const infoMilestoneController = require('../controllers/milestone/info');
const editMilestoneController = require('../controllers/milestone/edit');

router.post(
    '/createmilestone',
    passport.authenticate('jwt', {
        session: false
    }),
    authenticateRoutes.isCreator,
    createMilestoneController.createMilestone
);
router.post(
    '/getmilestones',
    passport.authenticate('jwt', {
        session: false
    }),
    authenticateRoutes.isMember,
    infoMilestoneController.getMilestones,
);
router.post(
    '/editmilestone',
    passport.authenticate('jwt', {
        session: false
    }),
    authenticateRoutes.isMember,
    editMilestoneController.editMilestone,
);
module.exports = router;