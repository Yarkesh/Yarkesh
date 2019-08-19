const router = require('express').Router();
const passport = require('passport');
const activityController = require('../controllers/activityController');
const authenticateRoutes = require('../middlewares/authentication');

router.post(
	'/createActivity',
	passport.authenticate('jwt', { session: false }),
	authenticateRoutes.isCreator,
	activityController.createActivity
);

module.exports = router;
