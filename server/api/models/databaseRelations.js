
const User = require('../models/user');
const Project = require('../models/project');
const ProjectMembers = require('../models/projectMembers')
const Story = require('../models/story');

Project.belongsTo(User, {
    foreignKey: 'creatorId',
    targetKey: 'userId',
    as: 'creator'
});

ProjectMembers.belongsTo(Project, {
    foreignKey: 'projectId',
    targetKey: 'projectId'
});
ProjectMembers.belongsTo(User, {
    foreignKey: 'memberId',
    targetKey: 'userId'
});

Story.belongsTo(Project, {
    foreignKey: 'projectId',
    targetKey: 'projectId'
})

Story.belongsTo(User, {
    foreignKey: 'creatorId',
    targetKey: 'userId',
    as: 'creator'
})