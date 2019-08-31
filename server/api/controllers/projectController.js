const Projects = require('../models/projects');
const ProjectMembers = require('../models/projectMembers');
const Users = require('../models/users');
const Sprints = require('../models/sprints');
const Stories = require('../models/stories');
const Activities = require('../models/activities');
const sequelize = require('sequelize');
exports.getProjectsByCreatorId = (req, res) => {
	// finding projects created by this certain user
	Projects.findAll({
			where: {
				creatorId: req.user.userId
			}
		})
		.then((projects) => {
			return res.status(200).json({
				projects
			});
		})
		.catch((err) => {
			return res.status(500).json({
				err
			});
		});
};

exports.getProjectDetails = (req, res) => {
	Projects.findAll({
			where: {
				projectId: req.body.projectId
			},
			include: [{
					model: Users,
					attributes: ['name'],
					as: 'creator'
				},
				{
					model: Sprints,
					attributes: ['sprintName'],
					as: 'currentSprint'
				}
			]
		})
		.then((projectInfo) => {
			return res.status(200).json({
				projectInfo: projectInfo[0]
			});
		})
		.catch((err) => {
			return res.status(500).json({
				err
			});
		});
};

exports.createProject = (req, res) => {
	// creating project with foreign key for user
	Projects.create({
			title: req.body.title,
			description: req.body.description,
			// foreign key to user : creatorId given from the jwt
			creatorId: req.user.userId
		})
		.then((project) => {
			ProjectMembers.create({
				memberId: req.user.userId,
				projectId: project.projectId
			});

			Activities.create({
				activityName: 'Default Activity',
				projectId: project.projectId
			});
			Sprints.create({
				projectId: project.projectId,
				sprintName: 'Story Pool',
				status: 'Open'
			}).then((sprint) => {
				Projects.update({
					activeSprint: sprint.sprintId
				}, {
					where: {
						projectId: project.projectId
					}
				});
				return res.status(200).json({
					title: project.title,
					projectId: project.projectId,
					description: project.description,
					activeSprint: sprint.sprintName,
					createdAt: project.createdAt,
					creator: {
						name: req.user.name
					}
				});
			});
		})
		.catch((err) => {
			return res.status(500).json({
				message: 'Project FAILED !',
				err
			});
		});
};

module.exports.getPorjectSprints = (req, res) => {
	Projects.findAll({
			where: {
				projectId: req.body.projectId
			},
			attributes: ['projectId'],
			include: [{
					model: Sprints,
					attributes: ['sprintId', 'sprintName'],
					as: 'sprints',
					include: [{
						model: Stories,
						attributes: ['storyName', 'storyId', 'activityId'],
						as: 'stories'
					}]
				},
				{
					model: Activities,
					attributes: ['activityName', 'activityId'],
					as: 'activity'
				}
			]
		})
		.then((project) => {
			return res.status(200).json({
				project
			});
		})
		.catch((err) => {
			return res.status(500).json({
				err
			});
		});
};

module.exports.deleteProject = (req, res) => {
	Projects.destroy({
			where: {
				projectId: req.body.projectId
			}
		})
		.then(() => {
			res.status(200).json({
				message: 'Project Deleted'
			});
		})
		.catch((err) => {
			res.status(500).json({
				err
			});
		});
};

module.exports.setActiveSprint = (req, res) => {
	Sprints.findOne({
		where: {
			sprintId: req.body.activeSprint,
			projectId: req.body.projectId
		}
	}).then((sprint) => {
		if (sprint) {
			Projects.update({
					activeSprint: req.body.activeSprint
				}, {
					where: {
						projectId: req.body.projectId
					}
				})
				.then((updated) => {
					return res.status(200).json({
						updated
					});
				})
				.catch((err) => {
					return res.status(500).json({
						message: 'cant change activesprint',
						err
					});
				});
		} else {
			return res.status(500).json({
				message: 'sprint not found'
			});
		}
	});
};

//!
module.exports.getPorjectSprintsDetails = (req, res) => {
	Sprints.findOne({
		where: {
			projectId: req.body.projectId,
			sprintName: 'Story Pool'
		},
		attributes: ['sprintId', 'sprintName'],
		include: [{
			model: Stories,
			attributes: ['storyId', 'storyName'],
			as: 'stories'
		}]
	}).then((pool) => {
		Sprints.findAll({
			where: {
				projectId: req.body.projectId,
				sprintName: {
					[sequelize.Op.not]: 'Story Pool'
				}
			},
			attributes: ['sprintId', 'sprintName'],
			include: [{
				model: Stories,
				attributes: ['storyId', 'storyName'],
				as: 'stories'
			}]
		}).then((sprints) => {
			return res.status(200).json({
				pool,
				sprints
			});
		});
	});
};

module.exports.getPorjectSprintsDetails2 = (req, res) => {
	Sprints.findAll({
		where: {
			projectId: req.body.projectId
		},
		attributes: ['sprintId', 'sprintName'],
		include: [{
			model: Stories,
			attributes: ['storyId', 'storyName'],
			as: 'stories'
		}]
	}).then((sprints) => {
		pool = sprints[0];
		sprints.splice(0, 1);
		return res.status(200).json({
			Pool: pool,
			Others: sprints
		});
	});
};