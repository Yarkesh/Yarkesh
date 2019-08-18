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
	sprintNumber: {
		allowNull: false,
		type: Sequelize.INTEGER
	},
	duration: {
		allowNull: false,
		type: Sequelize.TIME
	},
	dueDate: {
		allowNull: false,
		type: Sequelize.DATE
	}
});

module.exports = Sprints;
