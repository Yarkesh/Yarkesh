const router = require('express').Router();
const dataCreator = require('../controllers/databaseCreateFakeData')

router.post(
    '/createdata',
    dataCreator.createUsers,
    // dataCreator.createProjects,
    // dataCreator.createMembers,
    // dataCreator.createSprints,
    // dataCreator.createActivities,
    // dataCreator.createStories,
    // dataCreator.createDependency

);

module.exports = router