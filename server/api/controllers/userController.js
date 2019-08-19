const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
<<<<<<< HEAD
const {
	validationResult
} = require('express-validator');
const randomstring = require('randomstring');
const ProjectMembers = require('../models/projectMembers');
const Projects = require('../models/projects');
const Users = require('../models/users');
const errorHandler = require('./errorHandler');
const NotConfirmedUsers = require('../models/notConfirmedUsers');
const mail = require('../controllers/mailController');
=======
const jwtSecret = config.get('app.webServer.jwtSecret');
const {
	validationResult
} = require('express-validator');
const ProjectMembers = require('../models/projectMembers');
const Project = require('../models/project');
>>>>>>> meti

const jwtSecret = config.get('app.webServer.jwtSecret');
// ! FOR TEST ONLY
exports.getUserInfo = (req, res) => {
<<<<<<< HEAD
	Users.findAll({
=======
	User.findAll({
>>>>>>> meti
			where: {
				userId: req.user.userId
			}
		})
<<<<<<< HEAD
		.then((user) => {
=======
		.then(user => {
>>>>>>> meti
			return res.status(200).json({
				userInfo: user[0]
			});
		})
<<<<<<< HEAD
		.catch((err) => {
=======
		.catch(err => {
>>>>>>> meti
			return res.status(500).json({
				err
			});
		});
};

exports.getUserProjects = (req, res) => {
	ProjectMembers.findAll({
			where: {
				memberId: req.user.userId
			},
			include: [{
<<<<<<< HEAD
				model: Projects,
				attributes: ['title', 'projectId', 'description', 'createdAt'],
				include: [{
					model: Users,
=======
				model: Project,
				attributes: ['title', 'projectId', 'description', 'createdAt'],
				include: [{
					model: User,
>>>>>>> meti
					as: 'creator',
					attributes: ['name']
				}]
			}]
		})
<<<<<<< HEAD
		.then((projects) => {
			return res.status(200).json(
				projects.map((project) => {
					return project.project;
				})
			);
		})
		.catch((err) => {
=======
		.then(projects => {
			return res.status(200).json(projects.map(project => project.project));
		})
		.catch(err => {
>>>>>>> meti
			return res.status(500).json({
				err
			});
		});
};

exports.signUp = (req, res) => {
<<<<<<< HEAD
	// TODO FIX ERRORHANDLER
	// first we go to validation to validate the errors.
	// then we get a list and we call errorHandler.handler on it
	// then we get another list called handledErrorsList which contains errors
=======
	//TODO FIX ERRORHANDLER
	//first we go to validation to validate the errors.  then we get a list and we call errorHandler.handler on it
	//then we get another list called handledErrorsList which contains errors beautifully
>>>>>>> meti
	const errorsList = validationResult(req).errors;
	const handledErrorsList = errorHandler.handler(errorsList);
	if (Object.keys(handledErrorsList).length > 0) {
		return res.status(422).json(handledErrorsList);
	}
<<<<<<< HEAD
	// hasing the password
=======
	//hasing the password
>>>>>>> meti
	bcrypt.hash(req.body.password, 10, (err, hash) => {
		if (err) {
			return res.status(500).json({
				message: 'sign up failed',
<<<<<<< HEAD
				error: 'cannot hash',
				err
			});
		} else if (hash) {
			let confirmationCode = randomstring.generate({
				length: 4,
				charset: 'numeric'
			});

			mail
				.emailVerification(req.body.email, confirmationCode)
				.then((response) => {
					NotConfirmedUsers.create({
							userName: req.body.userName,
							email: req.body.email,
							name: req.body.name,
							password: hash,
							confirmationCode
						})

						// sign up success
						.then((user) => {
							return res.status(200).json({
								message: 'sign up complete, email verfication sent',
								userName: user.userName,
								email: user.email,
								userId: user.userId
							});
						})
						// sign up failed
						.catch((err) => {
							return res.status(500).json({
								message: 'sign up failed',
								err
							});
						});
				});
			// NotConfirmedUsers.create({
			// 	userName: req.body.userName,
			// 	email: req.body.email,
			// 	name: req.body.name,
			// 	password: hash,
			// 	confirmationCode
			// })

			// 	// sign up success
			// 	.then((user) => {
			// 		return res.status(200).json({
			// 			message: 'sign up complete, email verfication sent',
			// 			userName: user.userName,
			// 			email: user.email,
			// 			userId: user.userId
			// 		});
			// 	})
			// 	// sign up failed
			// 	.catch((err) => {
			// 		return res.status(500).json({
			// 			message: 'sign up failed',
			// 			err
			// 		});
			// 	});

			// create user in database with the given attributes
=======
				err: 'cannot hash',
				err
			});
		} else if (hash) {
			//create user in database with the given attributes
			User.create({
					userName: req.body.userName,
					email: req.body.email,
					name: req.body.name,
					password: hash
				})
				//sign up success
				.then(user => {
					return res.status(200).json({
						message: 'sign up complete',
						userName: user.userName,
						email: user.email,
						userId: user.userId
					});
				})
				//sign up failed
				.catch(err => {
					return res.status(500).json({
						message: 'sign up failed',
						err
					});
				});
>>>>>>> meti
		}
	});
};

exports.signIn = (req, res) => {
<<<<<<< HEAD
	// finding the user in database with given email
	NotConfirmedUsers.findAll({
			where: {
				email: req.body.email
			}
		})
		.then((unconfirmedUser) => {
			console.log(unconfirmedUser);
			if (unconfirmedUser.length != 0) {
				return res.status(500).json({
					message: 'account not verified.verify your email please'
				});
			}
			// ! fix this shit
		})
		.catch();

	Users.findAll({
			where: {
				email: req.body.email
			}
		})
		.then((user) => {
			// if user with such email does not exist
			if (user.length == 0) {
				return res.status(404).json({
					message: 'email or password incorrect'
				});
				// if user with this email exists
			} else {
				let firstuser = user[0];
				// checking if the password given is equal to the password in database
				bcrypt.compare(
					req.body.password,
					firstuser.password,
					(err, check) => {
						if (err) {
							return res.status(500).json({
								message: 'compare not complete'
							});
						} else if (check) {
							// if passwords are correct
							// creating the jwt for user
							const jwtpayload = {
								name: firstuser.name,
								email: firstuser.email,
								userId: firstuser.userId,
								userName: firstuser.userName
							};
							jwt.sign(
								jwtpayload,
								jwtSecret, {
									expiresIn: '10h'
								},
								(err, encoded) => {
									if (err) {
										throw new Error('error in jwt');
									} else {
										return res.status(200).json({
											done: true,
											secret: 'bearer ' + encoded
										});
									}
								}
							);
							// if passwords did not match that means password incorrect
						} else {
							return res.status(404).json({
								message: 'email or password incorrect'
							});
						}
					}
				);
			}
		})
		// ! fix this shit
		.catch();
};

module.exports.confirmEmail = (req, res) => {
	NotConfirmedUsers.findAll({
			where: {
				email: req.body.email
			}
		})
		.then((users) => {
			let confirmedUser = users[0];
			if (req.body.code == confirmedUser.confirmationCode) {
				NotConfirmedUsers.destroy({
					where: {
						email: req.body.email
					}
				});
				Users.create({
					userName: confirmedUser.userName,
					email: confirmedUser.email,
					name: confirmedUser.name,
					password: confirmedUser.password
				});
				return res.status(200).json({
					message: 'your account has been activated'
				});
			}
		})
		.catch();
};

module.exports.forgotPassword = (req, res) => {
	Users.findAll({
		where: {
			email: req.body.email
		}
	}).then((users) => {
		if (users.length != 0) {
			let forgotPasswordCode = randomstring.generate({
				length: 4,
				charset: 'numeric'
			});
			mail
				.forgotPassword(users[0].email, forgotPasswordCode)
				.then(() => {
					Users.update({
						forgotPasswordCode
					}, {
						where: {
							email: users[0].email
						}
					});
					return res.status(200).json({
						message: 'forgot password message sent'
					});
				})
				.catch((err) => {
					return res.status(500).json({
						err
					});
				});
		}
	});

	NotConfirmedUsers.findAll({
		where: {
			email: req.body.email
		}
	}).then((users) => {
		if (users.length != 0) {
			let forgotPasswordCode = randomstring.generate({
				length: 4,
				charset: 'numeric'
			});
			mail
				.forgotPassword(users[0].email, forgotPasswordCode)
				.then(() => {
					NotConfirmedUsers.update({
						forgotPasswordCode
					}, {
						where: {
							email: users[0].email
						}
					});
					return res.status(200).json({
						message: 'forgot password message sent'
					});
				})
				.catch((err) => {
					return res.status(500).json({
						err
					});
				});
		}
	});
};
module.exports.changePassword = (req, res) => {
	Users.findAll({
		where: {
			email: req.body.email
		}
	}).then((users) => {
		if (users.length != 0) {
			bcrypt.hash(req.body.password, 10, (error, hash) => {
				if (hash) {
					if (req.body.forgotPasswordCode == users[0].forgotPasswordCode) {
						Users.update({
							password: hash
						}, {
							where: {
								email: users[0].email
							}
						}).then(() => {
							return res.status(200).json({
								message: 'password changed1'
							});
						});
					} else if (error) {
						return res.status(500).json({
							message: 'hashing failure !'
=======
	//finding the user in database with given email
	User.findAll({
		where: {
			email: req.body.email
		}
	}).then(user => {
		// if user with such email does not exist
		if (user.length == 0) {
			return res.status(404).json({
				message: 'email or password incorrect'
			});
			// if user with this email exists
		} else {
			let firstuser = user[0];
			//checking if the password given is equal to the password in database
			bcrypt.compare(req.body.password, firstuser.password, (err, check) => {
				if (err) {
					return res.status(500).json({
						message: 'compare not complete'
					});
				} else {
					// if passwords are correct
					if (check) {
						//creating the jwt for user
						const jwtpayload = {
							name: firstuser.name,
							email: firstuser.email,
							userId: firstuser.userId,
							userName: firstuser.userName
						};
						jwt.sign(
							jwtpayload,
							jwtSecret, {
								expiresIn: '10h'
							},
							(err, encoded) => {
								if (err) {
									throw new Error('error in jwt');
								}
								return res.status(200).json({
									done: true,
									secret: 'bearer ' + encoded
								});
							}
						);
						//if passwords did not match that means password incorrect
					} else {
						return res.status(404).json({
							message: 'email or password incorrect'
>>>>>>> meti
						});
					}
				}
			});
		}
	});
<<<<<<< HEAD

	NotConfirmedUsers.findAll({
		where: {
			email: req.body.email
		}
	}).then((users) => {
		if (users.length != 0) {
			bcrypt.hash(req.body.password, 10, (err, hash) => {
				if (hash) {
					if (req.body.forgotPasswordCode == users[0].forgotPasswordCode) {
						NotConfirmedUsers.update({
								password: hash
							},

							{
								where: {
									email: users[0].email
								}
							}
						).then(() => {
							return res.status(200).json({
								message: 'password changed2'
							});
						});
					} else if (err) {
						return res.status(500).json({
							message: 'hashing failure !'
						});
					}
				}
			});
		}
=======
};

module.exports.deleteUser = (req, res) => {
	User.destroy({
		where: {
			userId: req.user.userId
		}
	}).then(() => {
		res.status(200).json({
			message: "User Deleted"
		})
	}).catch((err) => {
		res.status(500).json({
			err
		})
>>>>>>> meti
	});
};