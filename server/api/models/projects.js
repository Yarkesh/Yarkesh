const Sequelize = require('sequelize');
const dbConnection = require('./databaseConnection');

// ! INITIALIZING THE PROEJCT PROPERTY IN DATABASE
const Projects = dbConnection.define('projects', {
	projectId: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	title: {
		allowNull: false,
		type: Sequelize.STRING,
		unique: false
	},
	description: {
		allowNull: true,
		type: Sequelize.STRING,
		unique: false
	},
	creatorId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	activeSprintId: {
		type: Sequelize.INTEGER,
		allowNull: true
	},
	projectState: {
		type: Sequelize.JSON,
		allowNull: true
	},
	sprintDuration: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	defaultSprintId: {
		type: Sequelize.INTEGER,
		allowNull: true
	},
	defaultActivityId: {
		type: Sequelize.INTEGER,
		allowNull: true
	}
});

module.exports = Projects;