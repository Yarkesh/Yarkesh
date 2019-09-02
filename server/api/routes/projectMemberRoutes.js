const router = require('express').Router();
const passport = require('passport');
// const projectMemberController = require('../controllers/projectMemberController');
const createProjectMemberController = require('../controllers/projectMember/create');
const deleteProjectMemberController = require('../controllers/projectMember/delete');
const editProjectMemberController = require('../controllers/projectMember/edit');
const infoProjectMemberController = require('../controllers/projectMember/info');
const authenticateRoutes = require('../middlewares/authentication');

router.post(
	'/addmembers',
	passport.authenticate('jwt', {
		session: false
	}),
	authenticateRoutes.isCreator,
	createProjectMemberController.addMembers
);

router.post(
	'/getmembers',
	passport.authenticate('jwt', {
		session: false
	}),
	authenticateRoutes.isMember,
	infoProjectMemberController.getProjectMembers
);
router.delete(
	'/deletemember',
	passport.authenticate('jwt', {
		session: false
	}),
	authenticateRoutes.isCreator,
	deleteProjectMemberController.deleteMember
);
router.delete(
	'/leaveproject',
	passport.authenticate('jwt', {
		session: false
	}),
	authenticateRoutes.isMember,
	editProjectMemberController.leaveProject
);
module.exports = router;