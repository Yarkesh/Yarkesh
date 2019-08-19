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

Projects.hasMany(Sprints, {
	foreignKey: 'projectId',
	targetKey: 'projectId',
	as: 'sprints'
});
// Projects.belongsTo(Sprints, {
// 	foreignKey: 'activeSprint',
// 	targetKey: 'sprintId',
// 	as: 'currentSprint'
// });
// Projects.hasOne(Sprints, {
// 	foreignKey: 'activeSprint',
// 	targetKey: 'sprintId',
// 	as: 'currentSprint'
// });
Sprints.hasMany(Stories, {
	foreignKey: 'sprintId',
	targetKey: 'sprintId',
	as: 'stories'
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

Projects.hasMany(Activities, {
	foreignKey: 'projectId',
	targetKey: 'projectId',
	as: 'activity'
});
