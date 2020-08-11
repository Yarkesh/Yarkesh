const router = require('express').Router();
const passport = require('passport');
const createProjectMemberController = require('../controllers/projectMember/create');
const deleteProjectMemberController = require('../controllers/projectMember/delete');
const editProjectMemberController = require('../controllers/projectMember/edit');
const infoProjectMemberController = require('../controllers/projectMember/info');
const authenticateRoutes = require('../middlewares/authentication');
const inviteMemberValidator = require('../validators/projectMemberValidator/inviteMemberValidator');
const errorHandler = require('../controllers/errorHandler');

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

router.post(
	'/inviteMember',
	passport.authenticate('jwt', {
		session: false
	}),
	inviteMemberValidator.Validator,
	errorHandler.isValid,
	authenticateRoutes.isMember,
	createProjectMemberController.inviteMember
)

module.exports = router;