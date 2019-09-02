const router = require('express').Router();
const passport = require('passport');
// const activityController = require('../controllers/activityController');
const createActivityController = require('../controllers/activity/create');
const infoActivityController = require('../controllers/activity/info');
const authenticateRoutes = require('../middlewares/authentication');

router.post(
	'/createActivity',
	passport.authenticate('jwt', {
		session: false
	}),
	authenticateRoutes.isCreator,
	createActivityController.createActivity
);
router.post(
	'/getprojectactivities',
	passport.authenticate('jwt', {
		session: false
	}),
	authenticateRoutes.isMember,
	infoActivityController.getProjectActivities
);
module.exports = router;
