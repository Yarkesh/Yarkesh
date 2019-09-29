const configurationController = require('../controllers/configurationController');
const router = require('express').Router();

router.get(
    '/getconfiguration',
    configurationController.getConfiguration
);

module.exports = router