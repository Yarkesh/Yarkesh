const Projects = require('../models/projects');
const ProjectMembers = require('../models/projectMembers');
const Users = require('../models/users');

exports.getProjectMembers = (req, res) => {
	// TODO fix this shit
	ProjectMembers.findAll({
		where: {
			projectId: req.body.projectId
		},
		attributes: [],
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
	Users.findOne({
		where: {
			email: req.body.email
		}
	}).then((user) => {
		if (user) {
			ProjectMembers.findOne({
					where: {
						memberId: user.userId,
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
							name: user.name,
							email: user.email,
							userName: user.userName
						});
					} else {
						ProjectMembers.create({
								memberId: user.userId,
								projectId: req.body.projectId
							})
							.then((member) => {
								res.status(200).json({
									message: "member added to project",
									name: user.name,
									email: user.email,
									userName: user.userName
								})


							})
							.catch((err) => {
								return res.status(500).json({
									error: 'This user does not exist'
								});
							});
					}
				})
				.catch();
		} else {
			res.status(500).json({
				error: 'This email does not exist'
			})
		}

	})

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