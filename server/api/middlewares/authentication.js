const ProjectMembers = require('../models/projectMembers');
const Projects = require('../models/projects');
const Stories = require('../models/stories');
const Sequelize = require('sequelize');
const Op = Sequelize.Op
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
				error
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
				error
			});
		});
};

module.exports.isStoryInProject = (req, res, next) => {
	Stories.findOne({
			where: {
				storyId: req.body.storyId,
				projectId: req.body.projectId
			}
		})
		.then((story) => {
			console.log(story)
			if (story) {
				Stories.findOne({
					where: {
						storyId: req.body.dependsOn,
						projectId: req.body.projectId
					}
				}).then((story2) => {
					if (story2) {
						return next();
					} else {
						return res.status(500).json({
							error: "this depender is not in this project"
						})
					}
				})

			} else {
				return res.status(500).json({
					error: "this story is not in this project"
				})
			}
		})
		.catch((error) => {
			return res.status(500).json({
				message: "Error",
				error
			});
		});
};