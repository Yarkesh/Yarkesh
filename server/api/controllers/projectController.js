const Projects = require('../models/projects');
const ProjectMembers = require('../models/projectMembers');
const Users = require('../models/users');

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
		include: [
			{
				model: Users,
				attributes: ['name'],
				as: 'creator'
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
			return res.status(200).json({
				title: project.title,
				projectId: project.projectId,
				description: project.description,
				createdAt: project.createdAt,
				creator: {
					name: req.user.name
				}
			});
		})
		.catch((err) => {
			return res.status(500).json({
				message: 'Project FAILED !',
				err
			});
		});
};
