const router = require('express').Router();
const userController = require('./api/controllers/userController');
const validation = require('./api/controllers/validation')
const passport = require('passport')
const projectController = require('./api/controllers/projectController')
const projectMemberController = require('./api/controllers/projectMemberController')
const storyController = require('./api/controllers/storyController')
const authenticateRoutes = require('./api/controllers/authentication')
//! ----------------------------------Test Routes Not finished----------------------------------

//!----------------------------------Finished Routes----------------------------------

//* User routes
router.post(
    '/signup',
    validation.signUp,
    userController.signUp
);
router.post(
    '/signin',
    userController.signIn
);

router.get(
    '/singleUserInfo',
    passport.authenticate("jwt", { session: false }),
    userController.getUserInfo
);

router.post(
    '/getUserProjects',
    passport.authenticate("jwt", { session: false }),
    userController.getUserProjects
);

//* Project routes
router.post(
    '/getProjectsByCreator',
    passport.authenticate("jwt", { session: false }),
    projectController.getProjectsByCreatorId
);
router.post(
    '/createProject', passport.authenticate("jwt", { session: false }),
    projectController.createProject);

router.post(
    '/getProjectDetails',
    passport.authenticate("jwt", { session: false }),
    authenticateRoutes.isMember,
    projectController.getProjectDetails
);

router.post(
    '/getmembers',
    passport.authenticate("jwt", { session: false }),
    authenticateRoutes.isMember,
    projectMemberController.getProjectMembers
)


//* Project Members routes
router.post(
    '/addmembers',
    passport.authenticate("jwt", { session: false }),
    authenticateRoutes.isCreator,
    projectMemberController.addMembers
)

//* story routes

router.post(
    '/createStory',
    passport.authenticate("jwt", { session: false }),
    authenticateRoutes.isMember,
    storyController.createStory
);

router.post(
    '/getProjectStories',
    passport.authenticate("jwt", { session: false }),
    authenticateRoutes.isMember,
    storyController.getProjectStories
);

router.post(
    '/getStoryDetails',
    passport.authenticate("jwt", { session: false }),
    authenticateRoutes.isMember,
    storyController.getStoryDetials
);


module.exports = router;