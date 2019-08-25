const Projects = require('../models/projects');
const ProjectMembers = require('../models/projectMembers');
const Users = require('../models/users');
const Sprints = require('../models/sprints');
const Stories = require('../models/stories');
const Activities = require('../models/activities');

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
			}]
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
				sprintName: "Sprint #1",
				status: "Open"
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
						attributes: ['storyName'],
						as: 'stories',
					}]
				},
				{
					model: Activities,
					attributes: ['activityName'],
					as: 'activity',
					include: [{
						model: Stories,
						attributes: ['storyName'],
						as: 'stories',
					}]
				}
				// {
				// 	model: Sprints,
				// 	attributes: ['sprintId'],
				// 	as: 'sprints',
				// 	include: [
				// 		{
				// 			model: Activities,
				// 			attributes: ['activityName'],
				// 			as: 'activities'
				// 		}
				// 	]
				// }
			]
		})
		.then((project) => {
			return res.status(200).json({
				project
			});
		})
		.catch((err) => {
			return res.status(500).json({
				message: 'lskdfjlksadf',
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
				}).then((updated) => {
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
				message: 'sprint not found',


			});
		}
	})



}