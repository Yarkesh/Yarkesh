const router = require('express').Router();
const passport = require('passport');
const projectController = require('../controllers/projectController');
const authenticateRoutes = require('../middlewares/authentication');

router.get(
	'/getProjectsByCreator',
	passport.authenticate('jwt', {
		session: false
	}),
	projectController.getProjectsByCreatorId
);
router.post(
	'/createProject',
	passport.authenticate('jwt', {
		session: false
	}),
	projectController.createProject
);

router.post(
	'/getProjectDetails',
	passport.authenticate('jwt', {
		session: false
	}),
	authenticateRoutes.isMember,
	projectController.getProjectDetails
);

router.post(
	'/getprojectsprints',
	passport.authenticate('jwt', {
		session: false
	}),
	authenticateRoutes.isMember,
	projectController.getPorjectSprints
);
router.delete(
	'/deleteproject',
	passport.authenticate('jwt', {
		session: false
	}),
	authenticateRoutes.isCreator,
	projectController.deleteProject
);

router.post(
	'/setActiveSprint',
	passport.authenticate('jwt', {
		session: false
	}),
	authenticateRoutes.isCreator,
	projectController.setActiveSprint
);
router.post(
	'/getprojectsprintsdetails',
	passport.authenticate('jwt', {
		session: false
	}),
	authenticateRoutes.isMember,
	projectController.getPorjectSprintsDetails2
);




module.exports = router;