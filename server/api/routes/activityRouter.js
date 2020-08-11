const router = require('express').Router();
const passport = require('passport');
const createActivityController = require('../controllers/activity/create');
const infoActivityController = require('../controllers/activity/info');
const editActivityController = require('../controllers/activity/edit');
const deleteActivityController = require('../controllers/activity/delete');
const authenticateRoutes = require('../middlewares/authentication');
const createActivityValidator = require('../validators/activityValidator/createActivityValidator');
const getProjectActivitiesValidator = require('../validators/activityValidator/getProjectActivitiesOnlyValidator');
const editActivityValidator = require('../validators/activityValidator/editActivityValidator');
const deleteActivityValidator = require('../validators/activityValidator/deleteActivityValidator');
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

router.post(
	'/editActivity',
	passport.authenticate('jwt', {
		session: false
	}),
	editActivityValidator.Validator,
	errorHandler.isValid,
	authenticateRoutes.isCreator,
	editActivityController.editActivity
);

router.delete(
	'/deleteActivity',
	passport.authenticate('jwt', {
		session: false
	}),
	deleteActivityValidator.Validator,
	errorHandler.isValid,
	authenticateRoutes.isCreator,
	deleteActivityController.deleteActivity
);


module.exports = router;