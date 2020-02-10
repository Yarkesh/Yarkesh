const router = require('express').Router();
const passport = require('passport');
const createProjectController = require('../controllers/project/create');
const deleteProjectController = require('../controllers/project/delete');
const editProjectController = require('../controllers/project/edit');
const infoProjectController = require('../controllers/project/info');
const authenticateRoutes = require('../middlewares/authentication');
const createProjectValidator = require('../validators/projectValidator/createProject');
const deleteProjectValidator = require('../validators/projectValidator/deleteProject');
const getProjectDetailsValidator = require('../validators/projectValidator/projectDetails');
const getProjetSprintsValidator = require('../validators/projectValidator/getProjectSprints');
const errorHandler = require('../controllers/errorHandler');
const getProjectSprintsDetailsValidator = require('../validators/projectValidator/getProjectSprintDetails');
const getProjectTimelineValidator = require('../validators/projectValidator/getProjectTimeline');
const editProjectValidator = require('../validators/projectValidator/editProject');
const upload = require('../middlewares/uploadMiddleware');


router.post(
	'/createProject',
	passport.authenticate('jwt', {
		session: false
	}),
	createProjectValidator.Validator,
	errorHandler.isValid,
	createProjectController.createProject
);

router.post(
	'/getProjectDetails',
	passport.authenticate('jwt', {
		session: false
	}),
	getProjectDetailsValidator.Validator,
	errorHandler.isValid,
	authenticateRoutes.isMember,
	infoProjectController.getProjectDetails
);

router.delete(
	'/deleteproject',
	passport.authenticate('jwt', {
		session: false
	}),
	deleteProjectValidator.Validator,
	errorHandler.isValid,
	authenticateRoutes.isCreator,
	deleteProjectController.deleteProject
);

router.get(
	'/getProjectsByCreator',
	passport.authenticate('jwt', {
		session: false
	}),
	infoProjectController.getProjectsByCreatorId
);



router.post(
	'/getprojectsprints',
	passport.authenticate('jwt', {
		session: false
	}),
	getProjetSprintsValidator.Validator,
	errorHandler.isValid,
	authenticateRoutes.isMember,
	infoProjectController.getProjectSprints
);


router.post(
	'/getprojectsprintsdetails',
	passport.authenticate('jwt', {
		session: false
	}),
	getProjectSprintsDetailsValidator.Validator,
	errorHandler.isValid,
	authenticateRoutes.isMember,
	infoProjectController.getPorjectSprintsDetails
);

router.post(
	'/getprojecttimeline',
	passport.authenticate('jwt', {
		session: false
	}),
	getProjectTimelineValidator.Validator,
	errorHandler.isValid,
	authenticateRoutes.isMember,
	infoProjectController.getProjectTimeline
);

router.post(
	'/editproject',
	passport.authenticate('jwt', {
		session: false
	}),
	upload.single('logo'),
	authenticateRoutes.isMember,
	editProjectController.editProject
);

module.exports = router;