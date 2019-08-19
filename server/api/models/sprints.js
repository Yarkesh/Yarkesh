const Sequelize = require('sequelize');
const dbConnection = require('./database-connection');

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
		allowNull: false,
		type: Sequelize.STRING
	},
	duration: {
		allowNull: true,
		type: Sequelize.TIME
	},
	dueDate: {
		allowNull: true,
		type: Sequelize.DATE
	},
	status: {
		allowNull: true,
		type: Sequelize.STRING
	}
});

module.exports = Sprints;
