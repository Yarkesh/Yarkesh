const Sequelize = require('sequelize');
const dbConnection = require('./database-connection');
const Project = require('./project')
const User = require('./user')

//! INITIALIZING THE PROEJCT MEMBER PROPERTY IN DATABASE
const ProjectMembers = dbConnection.define('projectmembers', {
    projectMemberId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    memberId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {
        //     model: User,
        //     key: 'userId',
        //     deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        // }
    },
    projectId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {
        //     model: Project,
        //     key: 'projectId',
        //     deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        // }
    }
});


module.exports = ProjectMembers;