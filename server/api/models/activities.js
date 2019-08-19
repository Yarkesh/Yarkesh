const Sequelize = require('sequelize');
const dbConnection = require('./database-connection');

// ! INITIALIZING THE Assignments PROPERTY IN DATABASE
const Activities = dbConnection.define('activities', {
	activityId: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	projectId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	activityName: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

module.exports = Activities;
