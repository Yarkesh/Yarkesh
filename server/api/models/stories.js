const Sequelize = require('sequelize');
const dbConnection = require('./databaseConnection');

// ! INITIALIZING THE PROEJCT PROPERTY IN DATABASE
const Stories = dbConnection.define('stories', {
	// TODO: add title
	storyId: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	storyName: {
		type: Sequelize.STRING,
		allowNull: false
	},
	projectId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	creatorId: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	as: {
		allowNull: false,
		type: Sequelize.STRING,
		unique: false
	},
	iWant: {
		allowNull: false,
		type: Sequelize.STRING,
		unique: false
	},
	soThat: {
		allowNull: false,
		type: Sequelize.STRING,
		unique: false
	},
	// * Is it a Foreign key ??????
	// * This gotta be json
	acceptanceTest: {
		allowNull: true,
		type: Sequelize.JSON
	},
	// * Foreign key to statuses table
	status: {
		//TODO add 3 filters only in validation
		allowNull: true,
		type: Sequelize.STRING
	},
	// * Foreign key to User table
	storyPoint: {
		//TODO add 3 filters only in validation
		type: Sequelize.INTEGER,
		allowNull: false
	},
	// * Foreign key to project table

	priority: {
		type: Sequelize.STRING,
		allowNull: false
	},
	// * Foreign key to sprints table
	sprintId: {
		type: Sequelize.INTEGER,
		allowNull: true
	},
	activityId: {
		type: Sequelize.INTEGER,
		allowNull: true
	},
	// epic
	isEpic: {
		type: Sequelize.BOOLEAN,
		allowNull: true
	},
	dependency: {
		type: Sequelize.ARRAY(Sequelize.INTEGER),
		allowNull: true
	},
	assignment: {
		type: Sequelize.ARRAY(Sequelize.INTEGER),
		allowNull: true
	}

});

module.exports = Stories;