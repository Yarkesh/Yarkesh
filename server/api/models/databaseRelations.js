const Users = require('../models/users');
const Projects = require('../models/projects');
const ProjectMembers = require('../models/projectMembers');
const Stories = require('../models/stories');
const Activities = require('../models/activities');
const Dependencies = require('../models/dependencies');
const Sprints = require('../models/sprints');
const Assignment = require('../models/assignments');

Projects.belongsTo(Users, {
	foreignKey: 'creatorId',
	targetKey: 'userId',
	as: 'creator'
});

ProjectMembers.belongsTo(Projects, {
	foreignKey: 'projectId',
	targetKey: 'projectId'
});
ProjectMembers.belongsTo(Users, {
	foreignKey: 'memberId',
	targetKey: 'userId'
});

Stories.belongsTo(Projects, {
	foreignKey: 'projectId',
	targetKey: 'projectId'
});

Sprints.belongsTo(Projects, {
	foreignKey: 'projectId',
	targetKey: 'projectId',
	as: 'project'
});
// Projects.belongsTo(Sprints, {
// 	foreignKey: 'activeSprint',
// 	targetKey: 'sprintId',
// 	as: 'currentSprint'
// });
Projects.hasOne(Sprints, {
	foreignKey: 'activeSprint',
	targetKey: 'sprintId',
	as: 'currentSprint'
});
Stories.belongsTo(Sprints, {
	foreignKey: 'sprintId',
	targetKey: 'sprintId',
	as: 'sprint'
});
Stories.belongsTo(Activities, {
	foreignKey: 'activityId',
	targetKey: 'activityId',
	as: 'activity'
});

Dependencies.belongsTo(Stories, {
	foreignKey: 'storyId',
	targetKey: 'storyId',
	as: 'story'
});
Dependencies.belongsTo(Stories, {
	foreignKey: 'dependsOn',
	targetKey: 'storyId',
	as: 'dependencies'
});
Assignment.belongsTo(Users, {
	foreignKey: 'userId',
	targetKey: 'userId',
	as: 'assignedTo'
});
Assignment.belongsTo(Stories, {
	foreignKey: 'storyId',
	targetKey: 'storyId',
	as: 'story'
});
