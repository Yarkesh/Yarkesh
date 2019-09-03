const router = require('express').Router();
const passport = require('passport');
const authenticateRoutes = require('../middlewares/authentication');
const createMilestoneController = require('../controllers/milestone/create');
const infoMilestoneController = require('../controllers/milestone/info');

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
module.exports = router;