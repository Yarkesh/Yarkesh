const router = require('express').Router();
const passport = require('passport');
const createActivityController = require('../controllers/activity/create');
const infoActivityController = require('../controllers/activity/info');
const authenticateRoutes = require('../middlewares/authentication');
const createActivityValidator = require('../validators/activityValidator/createActivityValidator');
const getProjectActivitiesValidator = require('../validators/activityValidator/getProjectActivitiesOnlyValidator');
const errorHandler = require('../controllers/errorHandler');
router.post(
	'/createActivity',
	passport.authenticate('jwt', {
		session: false
	}),
	createActivityValidator.Validator,
	errorHandler.isValid,
	authenticateRoutes.isCreator,
	createActivityController.createActivity
);
router.post(
	'/getprojectactivities',
	passport.authenticate('jwt', {
		session: false
	}),
	getProjectActivitiesValidator.Validator,
	errorHandler.isValid,
	authenticateRoutes.isMember,
	infoActivityController.getProjectActivities
);
module.exports = router;