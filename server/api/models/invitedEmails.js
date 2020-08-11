const Sequelize = require('sequelize');
const dbConnection = require('./databaseConnection');

const InvitedEmails = dbConnection.define('invitedEmails', {
    invitedEmailId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    inviterId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false
    },
    projectId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false
    },
    email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: false
    },
    message: {
        allowNull: true,
        type: Sequelize.STRING,
        unique: false
    },

});

module.exports = InvitedEmails;