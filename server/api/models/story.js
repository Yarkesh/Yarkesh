const Sequelize = require('sequelize');
const dbConnection = require('./database-connection');
const User = require('./user');
const ProjectMembers = require('./projectMembers');

//! INITIALIZING THE PROEJCT PROPERTY IN DATABASE
const Story = dbConnection.define('story', {
    storyId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    projectId: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    //* Is it a Foreign key ??????
    //* This gotta be json
    acceptance: {
        allowNull: true,
        type: Sequelize.JSON,
    },
    //* Foreign key to statuses table
    status: {
        allowNull: true,
        type: Sequelize.STRING,
    },
    //* Foreign key to User table
    storyPoint: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    //* Foreign key to project table

    priority: {
        type: Sequelize.STRING,
        allowNull: true
    },
    //* Foreign key to assignments table
    assignedTo: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    //* Foreign key to dependencies table
    dependency: {
        allowNull: true,
        type: Sequelize.STRING,
    },
    //* Foreign key to sprints table
    sprintId: {
        type: Sequelize.INTEGER,
        allowNull: true,
    }

});


module.exports = Story;