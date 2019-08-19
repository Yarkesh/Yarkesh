const router = require('express').Router();
const passport = require('passport');
const sprintController = require('../controllers/sprintController');
const authenticateRoutes = require('../middlewares/authentication');

router.post(
	'/createSprint',
	passport.authenticate('jwt', { session: false }),
	authenticateRoutes.isCreator,
	sprintController.createSprint
);
router.post(
	'/getSprintStories',
	passport.authenticate('jwt', { session: false }),
	authenticateRoutes.isMember,
	sprintController.getSprintStories
);

module.exports = router;
