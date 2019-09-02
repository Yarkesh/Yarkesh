const configurationController = require('../controllers/configurationController');
const router = require('express').Router();

router.post(
    '/getconfiguration',
    configurationController.getConfiguration
);

module.exports = router