const Sequelize = require('sequelize');
const dbConnection = require('./databaseConnection');

// !-------------------User definition in database------------------------
const NotConfirmedUsers = dbConnection.define('notConfirmedUsers', {
	userId: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	userName: {
		allowNull: false,
		type: Sequelize.STRING,
		unique: false
	},
	email: {
		allowNull: false,
		type: Sequelize.STRING,
		unique: true
	},
	name: {
		allowNull: false,
		type: Sequelize.STRING
	},
	password: {
		allowNull: false,
		type: Sequelize.STRING
	},
	confirmationCode: {
		type: Sequelize.STRING,
		allowNull: true
	},
	forgotPasswordCode: {
		allowNull: true,
		type: Sequelize.STRING
	}
});

module.exports = NotConfirmedUsers;