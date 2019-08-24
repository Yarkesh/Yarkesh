const Sequelize = require('sequelize');
const dbConnection = require('./database-connection');

// ! INITIALIZING THE Assignments PROPERTY IN DATABASE
const Assignments = dbConnection.define('assignments', {
	assignmentsId: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	userId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	storyId: {
		type: Sequelize.INTEGER,
		allowNull: false
	}
});

module.exports = Assignments;