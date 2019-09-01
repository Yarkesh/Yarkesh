const Sequelize = require('sequelize');
const dbConnection = require('./databaseConnection');

// !-------------------sprint definition in database------------------------
const StorySprints = dbConnection.define('storySprints', {
    storySprintId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    projectId: {
        allowNull: false,
        type: Sequelize.INTEGER
    },
    sprintId: {
        allowNull: false,
        type: Sequelize.INTEGER
    },
    storyId: {
        allowNull: false,
        type: Sequelize.INTEGER
    }

});

module.exports = StorySprints;