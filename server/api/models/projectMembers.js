const Sequelize = require('sequelize');
const dbConnection = require('./databaseConnection');

// ! INITIALIZING THE PROEJCT MEMBER PROPERTY IN DATABASE
const ProjectMembers = dbConnection.define('projectmembers', {
	projectMemberId: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	memberId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	projectId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	memberRole: {
		type: Sequelize.STRING,
		allowNull: true
	}
});

module.exports = ProjectMembers;
