const Sequelize = require('sequelize');
const dbConnection = require('./databaseConnection');

// !-------------------User definition in database------------------------
const Users = dbConnection.define('users', {
	userId: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	userName: {
		allowNull: false,
		type: Sequelize.STRING,
		unique: true
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
	forgotPasswordCode: {
		allowNull: true,
		type: Sequelize.STRING
	},
	avatar: {
		allowNull: true,
		type: Sequelize.STRING
	}
});

module.exports = Users;