const ProjectMembers = require('../models/projectMembers');
const Projects = require('../models/projects');
const Stories = require('../models/stories');
const Sprints = require('../models/sprints');
const Activities = require('../models/activities');

module.exports.isMember = (req, res, next) => {
	ProjectMembers.findAll({
		where: {
			memberId: req.user.userId,
			projectId: req.body.projectId
		}
	})
		.then((member) => {
			if (member.length) {
				return next();
			} else {
				return res.status(401).json({
					message: 'user is not a member of this project'
				});
			}
		})
		.catch((error) => {
			return res.status(500).json({
				error,
				mess: 'asd'
			});
		});
};

module.exports.isCreator = (req, res, next) => {
	Projects.findAll({
		where: {
			creatorId: req.user.userId,
			projectId: req.body.projectId
		}
	})
		.then((creator) => {
			if (creator.length) {
				return next();
			} else {
				return res.status(500).json({
					message: 'user is not the creator of this project'
				});
			}
		})
		.catch((error) => {
			return res.status(500).json({
				error: "user or project not found"
			});
		});
};

module.exports.isStoryInProject = (req, res, next) => {
	Stories.findOne({
		where: {
			storyId: req.body.storyId,
			projectId: req.body.projectId
		}
	}).then((story) => {
		if (!story) {
			return res.status(404).json({
				error: "story not found"
			})

		} else {
			return next()
		}
	})
};
module.exports.isDependencyInProject = (req, res, next) => {
	Stories.findOne({
		where: {
			storyId: req.body.dependsOn,
			projectId: req.body.projectId
		}
	}).then((story) => {
		if (!story) {
			return res.status(404).json({
				error: "story dependsOn not found"
			})

		} else {
			return next()
		}
	})
};
module.exports.isSprintInProject = (req, res, next) => {
	Sprints.findOne({
		where: {
			sprintId: req.body.sprintId,
			projectId: req.body.projectId
		}
	}).then((sprint) => {
		if (!sprint) {
			return res.status(404).json({
				error: "sprint not found"
			})

		} else {
			return next()
		}
	})
};

module.exports.isActivityInProject = (req, res, next) => {
	Activities.findOne({
		where: {
			activityId: req.body.activityId,
			projectId: req.body.projectId
		}
	}).then((activity) => {
		if (!activity) {
			return res.status(404).json({
				error: "activity not found"
			})

		} else {
			return next()
		}
	})
};