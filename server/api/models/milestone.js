const Sequelize = require('sequelize');
const dbConnection = require('./databaseConnection');

// !-------------------sprint definition in database------------------------
const milestone = dbConnection.define('milestone', {
    milestoneId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    deadline: {
        type: Sequelize.DATE,
        allowNull: false
    }

});

module.exports = milestone;