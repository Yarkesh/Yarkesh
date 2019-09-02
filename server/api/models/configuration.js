const Sequelize = require('sequelize');
const dbConnection = require('./databaseConnection');

const Configuration = dbConnection.define('configuration', {
    configurationId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    key: {
        type: Sequelize.STRING,
        allowNull: false
    },
    value: {
        type: Sequelize.JSON,
        allowNull: false
    }
});

module.exports = Configuration;