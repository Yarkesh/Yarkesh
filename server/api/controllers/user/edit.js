const bcrypt = require('bcrypt');
const randomstring = require('randomstring');
const Users = require('../../models/users');
const NotConfirmedUsers = require('../../models/notConfirmedUsers');
const mail = require('../mailController');
const config = require('config');
const path = require('path');
const Resize = require('../image/Resize');
const {
	validationResult
} = require('express-validator');
const errorHandler = require('../errorHandler');

module.exports.forgotPassword = (req, res) => {

	Users.findOne({
			where: {
				email: req.body.email
			}
		})
		.then((user) => {
			if (user) {
				let forgotPasswordCode = randomstring.generate({
					length: 4,
					charset: 'numeric'
				});

				Users.update({
						forgotPasswordCode
					}, {
						where: {
							email: user.email
						}
					})
					.then((updated) => {
						mail.forgotPassword(user.email, forgotPasswordCode);
						return res.status(200).json({
							message: 'code sent to your email'
						});
					})
					.catch(() => {
						//uuser update fail
						return res.status(500).json({
							error: 'send forgot pasword email failed',
							errorCode: '329'
						});
					});
			}
		})
		.catch(() => {
			//uuser findOne fail
			return res.status(500).json({
				error: 'send forgot pasword email failed',
				errorCode: '328'
			});
		});

	NotConfirmedUsers.findOne({
			where: {
				email: req.body.email
			}
		})
		.then((user) => {
			if (user) {
				let forgotPasswordCode = randomstring.generate({
					length: 4,
					charset: 'numeric'
				});

				NotConfirmedUsers.update({
						forgotPasswordCode
					}, {
						where: {
							email: user.email
						}
					})
					.then((updated) => {
						mail.forgotPassword(user.email, forgotPasswordCode);
						return res.status(200).json({
							message: 'code sent to your email'
						});
					})
					.catch(() => {
						//notConfirmedUser update fail
						return res.status(500).json({
							error: 'send forgot pasword email failed',
							errorCode: '331'
						});
					});
			}
		})
		.catch(() => {
			//notConfirmedUser findOne fail
			return res.status(500).json({
				error: 'send forgot pasword email failed',
				errorCode: '330'
			});
		});
};

module.exports.changePassword = (req, res) => {

	Users.findOne({
			where: {
				email: req.body.email
			}
		})
		.then((user) => {
			if (user) {
				bcrypt.hash(req.body.password, 10, (error, hash) => {
					if (error) {
						//hash fail
						return res.status(500).json({
							error: 'change password failed',
							errorCode: '332'
						});
					} else if (hash) {
						if (req.body.forgotPasswordCode == user.forgotPasswordCode) {
							Users.update({
									password: hash,
									forgotPasswordCode: ''
								}, {
									where: {
										email: user.email
									}
								})
								.then(() => {
									return res.status(200).json({
										message: 'password changed'
									});
								})
								.catch(() => {
									return res.status(500).json({
										//update failed
										error: 'change password failed',
										errorCode: '334'
									});
								});
						}
					}
				});
			}
		})
		.catch(() => {
			return res.status(500).json({
				//findOne failed
				error: 'change password failed',
				errorCode: '333'
			});
		});

	NotConfirmedUsers.findOne({
			where: {
				email: req.body.email
			}
		})
		.then((user) => {
			if (user) {
				bcrypt.hash(req.body.password, 10, (err, hash) => {
					if (err) {
						//hash fail
						return res.status(500).json({
							error: 'change password failed',
							errorCode: '332'
						});
					} else if (hash) {
						if (req.body.forgotPasswordCode == user.forgotPasswordCode) {
							NotConfirmedUsers.update({
									password: hash,
									forgotPasswordCode: ''
								}, {
									where: {
										email: user.email
									}
								})
								.then(() => {
									return res.status(200).json({
										message: 'password changed'
									});
								})
								.catch(() => {
									return res.status(500).json({
										//update failed
										error: 'change password failed',
										errorCode: '335'
									});
								});
						}
					}
				});
			}
		})
		.catch(() => {
			return res.status(500).json({
				//findOne failed
				error: 'change password failed',
				errorCode: '336'
			});
		});
};

module.exports.editProfile = (req, res) => {

	Users.findOne({
			where: {
				userId: req.user.userId
			}
		}).then(oldUser => {
			let imageUrl = oldUser.avatar
			const imagePath = path.join(__dirname, '../../../pictures/users');
			const ImageName = `user${req.user.userId}.jpg`;
			let fileUpload = new Resize(imagePath, ImageName);
			if (req.file) {
				imageUrl = config.get('app.webServer.baseUrl') + '/pictures/users/' + ImageName
			}


			Users.update({
					name: req.body.name,
					avatar: imageUrl
				}, {
					where: {
						userId: req.user.userId
					}
				})
				.then(async () => {
					if (req.file) {
						const filename = await fileUpload.save(req.file.buffer);
					}
					Users.findOne({
						where: {
							userId: req.user.userId
						}
					}).then(updatedUser => {
						return res.status(200).json({
							updatedUser
						});
					})
					// return res.status(200).json({
					// 	name: req.body.name,
					// 	imageUrl
					// });
				})
				.catch((err) => {
					// console.log(err);
					return res.status(500).json({
						error: 'couldnt update user',
						errorCode: '367'
					});
				});
		})
		.catch(err => {
			return res.status(500).json({
				error: 'cant find user'
			})
		})

};

module.exports.editPassword = (req, res) => {

	Users.findOne({
		where: {
			userId: req.user.userId
		}
	}).then((user) => {
		bcrypt.compare(req.body.password, user.password, (err, same) => {
			if (err) {
				return res.status(500).json({
					error: 'couldnt compare',
					errorCode: '337'
				});
			}
			if (same) {
				if (req.body.newPassword == req.body.confirmNewPassword) {
					bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
						if (hash) {
							Users.update({
									password: hash
								}, {
									where: {
										userId: req.user.userId
									}
								}).then(() => {
									return res.status(200).json({
										message: 'password has changed'
									});
								})
								.catch((err) => {
									return res.status(500).json({
										error: 'couldnt hash',
										errorCode: '339'
									});
								})
						}
					});
				} else {
					return res.status(422).json({
						error: {
							"confirmNewPassword": ["confirm password must match the new password"]
						}
					})

				}
			} else {
				return res.status(422).json({
					error: {
						"password": ["old password is wrong"]
					}
				})
			}
		});
	});
};