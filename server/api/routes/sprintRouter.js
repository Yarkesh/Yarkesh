const router = require('express').Router();
const passport = require('passport');
const createSprintController = require('../controllers/sprint/create');
const infoSprintController = require('../controllers/sprint/info');
const editSprintController = require('../controllers/sprint/edit');
const authenticateRoutes = require('../middlewares/authentication');
const errorHandler = require('../controllers/errorHandler');
const createSprintValidator = require('../validators/sprintValidator/createSprint');
const getSprintStoriesValidator = require('../validators/sprintValidator/getSprintStories');
const getProjectSprintsValidator = require('../validators/sprintValidator/getProjectSprints');
const deleteSprintController = require('../controllers/sprint/delete');
const deleteSprintValidator = require('../validators/sprintValidator/deleteSprint');

router.post(
	'/createSprint',
	passport.authenticate('jwt', {
		session: false
	}),
	createSprintValidator.Validator,
	errorHandler.isValid,
	authenticateRoutes.isCreator,
	createSprintController.createSprint
);
router.post(
	'/getSprintStories',
	passport.authenticate('jwt', {
		session: false
	}),
	getSprintStoriesValidator.Validator,
	errorHandler.isValid,
	authenticateRoutes.isMember,
	authenticateRoutes.isSprintInProject,
	infoSprintController.getSprintStories
);
router.post(
	'/getprojectsprints',
	passport.authenticate('jwt', {
		session: false
	}),
	getProjectSprintsValidator.Validator,
	errorHandler.isValid,
	authenticateRoutes.isMember,
	infoSprintController.getProjectSprints
);


router.delete(
	'/deletesprint',
	passport.authenticate('jwt', {
		session: false
	}),
	deleteSprintValidator.Validator,
	errorHandler.isValid,
	authenticateRoutes.isCreator,
	authenticateRoutes.isSprintInProject,
	deleteSprintController.deleteSprint
);


// router.post(
// 	'/findactivesprint',
// 	passport.authenticate('jwt', {
// 		session: false
// 	}),
// 	authenticateRoutes.isMember,
// 	infoSprintController.findActiveSprint
// );
module.exports = router;