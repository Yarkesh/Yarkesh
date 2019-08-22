const router = require('express').Router();
const passport = require('passport');
const userController = require('../controllers/userController');
const validation = require('../controllers/validation');
const dataCreator = require('../controllers/databaseCreateFakeData')

router.post(
    '/createdata',
    dataCreator.createUsers,
    dataCreator.createProjects,

);

module.exports = router