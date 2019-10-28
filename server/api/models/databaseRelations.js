const Users = require('../models/users');
const Projects = require('../models/projects');
const ProjectMembers = require('../models/projectMembers');
const Stories = require('../models/stories');
const Activities = require('../models/activities');
const Dependencies = require('../models/dependencies');
const Sprints = require('../models/sprints');
const Assignment = require('../models/assignments');
const StorySprints = require('../models/storySprints');
const Milestones = require('../models/milestone');
const invitedEmails = require('../models/invitedEmails');

Projects.belongsTo(Users, {
	foreignKey: 'creatorId',
	targetKey: 'userId',
	as: 'creator',
	onUpdate: 'cascade',
	onDelete: 'cascade',
	hooks: true
});



ProjectMembers.belongsTo(Users, {
	foreignKey: 'memberId',
	targetKey: 'userId',
	onUpdate: 'cascade',
	onDelete: 'cascade',
	hooks: true
});

Users.hasMany(ProjectMembers, {
	foreignKey: 'memberId',
	targetKey: 'userId',
	onUpdate: 'cascade',
	onDelete: 'cascade',
	hooks: true
});

ProjectMembers.belongsTo(Projects, {
	foreignKey: 'projectId',
	targetKey: 'projectId',
	onUpdate: 'cascade',
	onDelete: 'cascade',
	hooks: true
});

Stories.belongsTo(Projects, {
	foreignKey: 'projectId',
	targetKey: 'projectId',
	onUpdate: 'cascade',
	onDelete: 'cascade',
	hooks: true
});

Projects.hasMany(Sprints, {
	foreignKey: 'projectId',
	targetKey: 'projectId',
	as: 'sprints',
	onUpdate: 'cascade',
	onDelete: 'cascade',
	hooks: true
});
Projects.hasOne(Sprints, {
	foreignKey: 'projectId',
	targetKey: 'projectId',
	as: 'activeSprint'
})
Projects.hasOne(Sprints, {
	foreignKey: 'defaultSprintId',
	targetKey: 'sprintId',
	as: 'defaultSprint'
})
Sprints.hasMany(Stories, {
	foreignKey: 'sprintId',
	targetKey: 'sprintId',
	as: 'stories'
});
Stories.belongsTo(Sprints, {
	foreignKey: 'sprintId',
	targetKey: 'sprintId',
	as: 'sprint'
})
Activities.hasMany(Stories, {
	foreignKey: 'activityId',
	targetKey: 'activityId',
	as: 'stories'
});
Stories.belongsTo(Activities, {
	foreignKey: 'activityId',
	targetKey: 'activityId',
	as: 'activity'
})
Stories.hasMany(Dependencies, {
	foreignKey: 'storyId',
	targetKey: 'storyId',
	as: 'dependencies',
	onUpdate: 'cascade',
	onDelete: 'cascade',
	constraints: false

});

Dependencies.belongsTo(Stories, {
	foreignKey: 'dependsOn',
	targetKey: 'storyId',
	as: 'story',
	onUpdate: 'cascade',
	onDelete: 'cascade',
	constraints: false
})

Assignment.belongsTo(Users, {
	foreignKey: 'userId',
	targetKey: 'userId',
	as: 'assignedTo'
});
Stories.hasMany(Assignment, {
	foreignKey: 'storyId',
	targetKey: 'storyId',
	as: 'assignedTo',
	onUpdate: 'cascade',
	onDelete: 'cascade',
	hooks: true
});
Projects.hasMany(Activities, {
	foreignKey: 'projectId',
	targetKey: 'projectId',
	as: 'activity'
});
Projects.hasOne(Activities, {
	foreignKey: 'defaultActivityId',
	targetKey: 'activityId',
	as: 'defaultActivity'
})

Sprints.hasMany(StorySprints, {
	foreignKey: 'sprintId',
	targetKey: 'sprintId'
});

Stories.hasMany(StorySprints, {
	foreignKey: 'storyId',
	targetKey: 'storyId'
});

Projects.hasMany(Milestones, {
	foreignKey: 'projectId',
	targetKey: 'projectId',
	as: 'milestone'
});

Users.hasMany(invitedEmails, {
	foreignKey: 'inviterId',
	targetKey: 'userId',
	as: 'inviter'
})

Projects.hasMany(invitedEmails, {
	foreignKey: 'projectId',
	targetKey: 'projectId',
})