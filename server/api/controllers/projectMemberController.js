const Project = require('../models/project');
const ProjectMembers = require('../models/projectMembers');
const User = require('../models/user');

exports.getProjectMembers = (req, res) => {
	// TODO fix this shit
	ProjectMembers.findAll({
		where: {
			projectId: req.body.projectId
		},
		include: [
			{
				model: User,
				attributes: ['name', 'email', 'userName']
			},
			{
				model: Project,
				attributes: ['title']
			}
		]
	}).then((members) => {
		return res.status(200).json({
			members
		});
	});
};

exports.addMembers = (req, res) => {
	ProjectMembers.create({
		memberId: req.body.userId,
		projectId: req.body.projectId
	})
		.then((result) => {
			return res.status(200).json({
				message: 'member added to project',
				projectId: result.projectId,
				memberId: result.memberId
			});
		})
		.catch((err) => {
			return res.status(500).json({
				message: 'adding member FAILED !',
				err
			});
		});
};
