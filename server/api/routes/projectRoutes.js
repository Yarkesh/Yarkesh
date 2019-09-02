const router = require('express').Router();
const passport = require('passport');
// const projectController = require('../controllers/projectController');
const createProjectController = require('../controllers/project/create');
const deleteProjectController = require('../controllers/project/delete');
const editProjectController = require('../controllers/project/edit');
const infoProjectController = require('../controllers/project/info');
const authenticateRoutes = require('../middlewares/authentication');

router.get(
	'/getProjectsByCreator',
	passport.authenticate('jwt', {
		session: false
	}),
	infoProjectController.getProjectsByCreatorId
);
router.post(
	'/createProject',
	passport.authenticate('jwt', {
		session: false
	}),
	createProjectController.createProject
);

router.post(
	'/getProjectDetails',
	passport.authenticate('jwt', {
		session: false
	}),
	authenticateRoutes.isMember,
	infoProjectController.getProjectDetails
);

router.post(
	'/getprojectsprints',
	passport.authenticate('jwt', {
		session: false
	}),
	authenticateRoutes.isMember,
	infoProjectController.getPorjectSprints
);
router.delete(
	'/deleteproject',
	passport.authenticate('jwt', {
		session: false
	}),
	authenticateRoutes.isCreator,
	deleteProjectController.deleteProject
);

router.post(
	'/setActiveSprint',
	passport.authenticate('jwt', {
		session: false
	}),
	authenticateRoutes.isCreator,
	editProjectController.setActiveSprint
);
router.post(
	'/getprojectsprintsdetails',
	passport.authenticate('jwt', {
		session: false
	}),
	authenticateRoutes.isMember,
	infoProjectController.getPorjectSprintsDetails2
);

router.post(
	'/getprojecttimeline',
	passport.authenticate('jwt', {
		session: false
	}),
	authenticateRoutes.isMember,
	infoProjectController.getProjectTimeline
);

module.exports = router;