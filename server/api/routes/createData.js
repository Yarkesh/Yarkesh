const router = require('express').Router();
const passport = require('passport');
const userController = require('../controllers/userController');
const validation = require('../controllers/validation');
const dataCreator = require('../controllers/databaseCreateFakeData')

router.post(
    '/createdata',
    dataCreator.createUsers,
    dataCreator.createProjects,
    dataCreator.createMembers,
    dataCreator.createSprints,
    dataCreator.createActivities,
    dataCreator.createStories,
    dataCreator.createDependency

);

module.exports = router