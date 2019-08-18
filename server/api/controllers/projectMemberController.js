const Projects = require('../models/projects');
const ProjectMembers = require('../models/projectMembers');
const Users = require('../models/users');

exports.getProjectMembers = (req, res) => {
	// TODO fix this shit
	ProjectMembers.findAll({
		where: {
			projectId: req.body.projectId
		},
		include: [
			{
				model: Users,
				attributes: ['name', 'email', 'userName']
			},
			{
				model: Projects,
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

exports.searchMembers = (req, res) => {
	// Customer.findAll({
	// 	where: {
	// 		$or: [
	// 			{firstName: {$or: searchFor}},
	// 			{lastName: {$or: searchFor}},
	// 			{email: {$or: searchFor}}
	// 		]
	// 	},
	// 	order: [['createdAt', 'DESC']],
	// 	limit: 50
	// })
};
