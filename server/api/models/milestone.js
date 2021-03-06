const Sequelize = require('sequelize');
const dbConnection = require('./databaseConnection');

// !-------------------milestone definition in database------------------------
const milestone = dbConnection.define('milestone', {
    milestoneId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    projectId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    milestoneNo: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    dueDate: {
        type: Sequelize.DATE,
        allowNull: true
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true
    }

});

module.exports = milestone;