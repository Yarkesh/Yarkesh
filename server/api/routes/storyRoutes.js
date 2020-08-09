const router = require('express').Router();
const passport = require('passport');
const createStoryController = require('../controllers/story/create');
const editStoryController = require('../controllers/story/edit');
const infoStoryController = require('../controllers/story/info');
const deleteStoryController = require('../controllers/story/delete');
const authenticateRoutes = require('../middlewares/authentication');
const createStoryValidator = require('../validators/storyValidator/createStoryValidator');
const editStoryValidator = require('../validators/storyValidator/editStoryValidator');
const errorHandler = require('../controllers/errorHandler');

router.post(
	'/createStory',
	passport.authenticate('jwt', {
		session: false
	}),
	createStoryValidator.Validator,
	errorHandler.isValid,
	authenticateRoutes.isMember,
	createStoryController.createStory
);

router.post(
	'/getProjectStories',
	passport.authenticate('jwt', {
		session: false
	}),
	authenticateRoutes.isMember,
	infoStoryController.getProjectStories
);
router.post(
	'/getProjectStoriesWithDetail',
	passport.authenticate('jwt', {
		session: false
	}),
	authenticateRoutes.isMember,
	infoStoryController.getProjectStoriesWithDetail
);

router.post(
	'/getStoryDetails',
	passport.authenticate('jwt', {
		session: false
	}),
	authenticateRoutes.isMember,
	infoStoryController.getStoryDetials
);

router.post(
	'/getProjectStoriesBacklog',
	passport.authenticate('jwt', {
		session: false
	}),
	authenticateRoutes.isMember,
	infoStoryController.getProjectStoriesBacklog
);


router.post(
	'/changesprint',
	passport.authenticate('jwt', {
		session: false
	}),
	authenticateRoutes.isMember,
	authenticateRoutes.isSprintInProject,
	authenticateRoutes.isStoryInProject,
	editStoryController.changeSprint
);

router.delete(
	'/deletestory',
	passport.authenticate('jwt', {
		session: false
	}),
	authenticateRoutes.isCreator,
	authenticateRoutes.isStoryInProject,
	deleteStoryController.deleteStory
);

router.post(
	'/editstory',
	passport.authenticate('jwt', {
		session: false
	}),
	editStoryValidator.Validator,
	errorHandler.isValid,
	authenticateRoutes.isCreator,
	authenticateRoutes.isStoryInProject,
	editStoryController.editStory
);

module.exports = router;