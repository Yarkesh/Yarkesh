const Sequelize = require('sequelize');
const dbConnection = require('./database-connection');

// ! INITIALIZING THE Dependencies PROPERTY IN DATABASE
const Dependencies = dbConnection.define('dependencies', {
	dependencyId: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	storyId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	dependsOn: {
		type: Sequelize.INTEGER,
		allowNull: false
	}
});

module.exports = Dependencies;
