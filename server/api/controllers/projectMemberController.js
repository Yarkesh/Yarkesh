const Projects = require('../models/projects');
const ProjectMembers = require('../models/projectMembers');
const Users = require('../models/users');

exports.getProjectMembers = (req, res) => {
	// TODO fix this shit
	ProjectMembers.findAll({
		where: {
			projectId: req.body.projectId
		},
		include: [{
			model: Users,
			attributes: ['name', 'email', 'userName']
		}]
	}).then((members) => {
		return res.status(200).json({
			members
		});
	});
};

exports.addMembers = (req, res, next) => {
	ProjectMembers.findOne({
			where: {
				memberId: req.body.userId,
				projectId: req.body.projectId
			},
			include: [{
				model: Users,
				attributes: ['name', 'email', 'userName']
			}]
		})
		.then((member) => {
			if (member) {
				return res.status(500).json({
					error: 'This member is already a part of this project',
					member
				});
			} else {
				ProjectMembers.create({
						memberId: req.body.userId,
						projectId: req.body.projectId
					})
					.then((member) => {
						ProjectMembers.findOne({
								where: {
									projectId: req.body.projectId,
									memberId: member.memberId
								},
								include: [{
									model: Users,
									attributes: ['name', 'email', 'userName']
								}]
							})
							.then((members) => {
								return res.status(200).json({
									message: 'User added to project',
									members
								});
							})
							.catch();
					})
					.catch((err) => {
						return res.status(500).json({
							error: 'This user does not exist'
						});
					});
			}
		})
		.catch();
};

module.exports.deleteMember = (req, res) => {
	ProjectMembers.destroy({
			where: {
				memberId: req.body.memberId,
				projectId: req.body.projectId
			}
		})
		.then((done) => {
			if (done == 1) {
				res.status(200).json({
					message: 'Member Deleted'
				});
			} else {
				res.status(500).json({
					error: 'user is not a member of this project'
				});
			}
		})
		.catch((err) => {
			res.status(500).json({
				err
			});
		});
};
module.exports.leaveProject = (req, res) => {
	ProjectMembers.destroy({
			where: {
				memberId: req.user.userId
			}
		})
		.then((done) => {
			if (done == 1) {
				res.status(200).json({
					message: 'You have succesfully left this project'
				});
			} else {
				res.status(500).json({
					error: 'user is not a member of this project'
				});
			}
		})
		.catch((err) => {
			res.status(500).json({
				err
			});
		});
};