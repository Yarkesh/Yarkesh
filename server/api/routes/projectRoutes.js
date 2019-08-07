const router = require('express').Router();
const passport = require('passport')
const projectController = require('../controllers/projectController')
const authenticateRoutes = require('../middlewares/authentication')

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


module.exports = router