const router = require('express').Router();
const passport = require('passport');
const storyController = require('../controllers/storyController');
const authenticateRoutes = require('../middlewares/authentication');

router.post(
	'/createStory',
	passport.authenticate('jwt', {
		session: false
	}),
	authenticateRoutes.isMember,
	storyController.createStory
);

router.post(
	'/getProjectStories',
	passport.authenticate('jwt', {
		session: false
	}),
	authenticateRoutes.isMember,
	storyController.getProjectStories
);
router.post(
	'/getProjectStoriesWithDetail',
	passport.authenticate('jwt', {
		session: false
	}),
	authenticateRoutes.isMember,
	storyController.getProjectStoriesWithDetail
);

router.post(
	'/getStoryDetails',
	passport.authenticate('jwt', {
		session: false
	}),
	authenticateRoutes.isMember,
	storyController.getStoryDetials
);

router.post(
	'/getProjectStoriesBacklog',
	passport.authenticate('jwt', {
		session: false
	}),
	authenticateRoutes.isMember,
	storyController.getProjectStoriesBacklog
);


router.post(
	'/changesprint',
	passport.authenticate('jwt', {
		session: false
	}),
	authenticateRoutes.isMember,
	authenticateRoutes.isSprintInProject,
	authenticateRoutes.isStoryInProject,
	storyController.changeSprint
);

module.exports = router;