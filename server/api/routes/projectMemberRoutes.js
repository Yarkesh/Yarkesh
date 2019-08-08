const router = require('express').Router();
const passport = require('passport');
const projectMemberController = require('../controllers/projectMemberController');
const authenticateRoutes = require('../middlewares/authentication');

router.post(
	'/addmembers',
	passport.authenticate('jwt', { session: false }),
	authenticateRoutes.isCreator,
	projectMemberController.addMembers
);

router.post(
	'/getmembers',
	passport.authenticate('jwt', { session: false }),
	authenticateRoutes.isMember,
	projectMemberController.getProjectMembers
);
module.exports = router;
