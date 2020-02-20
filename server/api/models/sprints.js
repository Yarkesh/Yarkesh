const Sequelize = require('sequelize');
const dbConnection = require('./databaseConnection');

// !-------------------sprint definition in database------------------------
const Sprints = dbConnection.define('sprints', {
	sprintId: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	projectId: {
		allowNull: false,
		type: Sequelize.INTEGER
	},
	sprintName: {
		allowNull: true,
		type: Sequelize.STRING
	},
	description: {
		allowNull: true,
		type: Sequelize.TEXT
	},
	sprintNo: {
		allowNull: true,
		type: Sequelize.STRING
	},
	duration: {
		allowNull: true,
		type: Sequelize.INTEGER
	},
	startDate: {
		allowNull: true,
		type: Sequelize.DATE
	},
	dueDate: {
		allowNull: true,
		type: Sequelize.DATE
	},
	status: {
		allowNull: true,
		type: Sequelize.STRING
	},

});

module.exports = Sprints;