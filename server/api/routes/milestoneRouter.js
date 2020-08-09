const router = require('express').Router();
const passport = require('passport');
const authenticateRoutes = require('../middlewares/authentication');
const createMilestoneController = require('../controllers/milestone/create');
const infoMilestoneController = require('../controllers/milestone/info');
const editMilestoneController = require('../controllers/milestone/edit');
const deleteMilestoneController = require('../controllers/milestone/delete');
const errorHandler = require('../controllers/errorHandler');
const createMilestoneValidator = require('../validators/milestoneValidator/createMilestoneValidator');
const getMilestoneValidator = require('../validators/milestoneValidator/getMilestonesValidator');
const editMilestoneValidator = require('../validators/milestoneValidator/editMilestoneValidator');
const deleteMilestoneValidator = require('../validators/milestoneValidator/deleteMilestoneValidator');


//create a new milestone in the project
router.post(
    '/createmilestone',
    passport.authenticate('jwt', {
        session: false
    }),
    authenticateRoutes.isCreator,
    createMilestoneValidator.Validator,
    errorHandler.isValid,
    createMilestoneController.createMilestone
);

//get all the milestones in project
router.post(
    '/getmilestones',
    passport.authenticate('jwt', {
        session: false
    }),
    authenticateRoutes.isMember,
    getMilestoneValidator.Validator,
    errorHandler.isValid,
    infoMilestoneController.getMilestones,
);

//edit single milestone in project
router.post(
    '/editmilestone',
    passport.authenticate('jwt', {
        session: false
    }),
    authenticateRoutes.isCreator,
    editMilestoneValidator.Validator,
    errorHandler.isValid,
    editMilestoneController.editMilestone,
);

//delete single milestone in project
router.delete(
    '/deletemilestone',
    passport.authenticate('jwt', {
        session: false
    }),
    authenticateRoutes.isCreator,
    deleteMilestoneValidator.Validator,
    errorHandler.isValid,
    deleteMilestoneController.deleteMilestone
);



// router.post(
//     '/createmilestonefromdate',
//     passport.authenticate('jwt', {
//         session: false
//     }),
//     authenticateRoutes.isCreator,
//     createMilestoneController.createMilestoneFromDate
// );

module.exports = router;