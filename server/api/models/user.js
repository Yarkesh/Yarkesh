const Sequelize = require('sequelize');
const dbConnection = require('./database-connection');

// !-------------------User definition in database------------------------
const User = dbConnection.define('user', {
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
	}
	// verified: {
	// 	type: Sequelize.BOOLEAN,
	// 	defaultValue: false
	// }
});

module.exports = User;