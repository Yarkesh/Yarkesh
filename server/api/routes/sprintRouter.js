const router = require('express').Router();
const passport = require('passport');
const createSprintController = require('../controllers/sprint/create');
const infoSprintController = require('../controllers/sprint/info');
const editSprintController = require('../controllers/sprint/edit');
const authenticateRoutes = require('../middlewares/authentication');

router.post(
	'/createSprint',
	passport.authenticate('jwt', {
		session: false
	}),
	authenticateRoutes.isCreator,
	createSprintController.createSprint
);
router.post(
	'/getSprintStories',
	passport.authenticate('jwt', {
		session: false
	}),
	authenticateRoutes.isMember,
	infoSprintController.getSprintStories
);
router.post(
	'/getprojectsprints',
	passport.authenticate('jwt', {
		session: false
	}),
	authenticateRoutes.isMember,
	infoSprintController.getProjectSprints
);
module.exports = router;