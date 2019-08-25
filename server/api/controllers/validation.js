const {
	check
} = require('express-validator');
const Users = require('../models/users');
const NotConfirmedUsers = require('../models/notConfirmedUsers');
const Stories = require('../models/stories');

// Checking if the attributes provided are valid
exports.signUp = [
	// Email validation
	check('email')
	.isEmail()
	.normalizeEmail()
	.withMessage('email is not valid')
	.isLength({
		max: 50
	})
	.withMessage("email can't be more than 50 characters long")
	.custom((email) => {
		return Users.findAll({
			where: {
				email: email
			}
		}).then((res) => {
			if (res.length) {
				return Promise.reject('Email already in use');
			}
		});
	})
	.custom((email) => {
		return NotConfirmedUsers.findAll({
			where: {
				email: email
			}
		}).then((res) => {
			if (res.length) {
				return Promise.reject('Email already in use');
			}
		});
	}),

	// username validation
	check('userName')
	.isLength({
		min: 2,
		max: 32
	})
	.withMessage('username must be  between 2 and 32 characters long')
	.custom((userName) => {
		//TODO add NOT CONFIRMED USERS HERE TOO . 
		return Users.findAll({
			where: {
				userName: userName
			}
		}).then((res) => {
			if (res.length) {
				return Promise.reject('userName already in use');
			}
		});
	})
	.custom((userName) => {
		return NotConfirmedUsers.findAll({
			where: {
				userName: userName
			}
		}).then((res) => {
			if (res.length) {
				return Promise.reject('userName already in use');
			}
		});
	}),
	// name validation
	check('name')
	.isLength({
		min: 2,
		max: 32
	})
	.withMessage('name must be  between 2 and 32 characters long'),

	// password validation
	check('password')
	.isLength({
		min: 6
	})
	.withMessage('password must be at least 6 characters long')
	.matches(/\d/)
	.withMessage('password must contain a number'),

	// confirmpassword validation
	// check(
	// 	'confirmPassword',
	// 	'passwordConfirmation field must have the same value as the password field'
	// )
	// 	.exists()
	// 	.custom((value, { req }) => {
	// 		value === req.body.password;
	// 	})
	check('password').custom((valuee, {
		req
	}) => {
		if (valuee !== req.body.confirmPassword) {
			throw new Error('Password confirmation is incorrect');
		} else {
			return true;
		}
	})
];



exports.dependency = async (req, res, next) => {

	await check().custom(() => {
		Stories.findOne({
			where: {
				storyId: req.body.storyId,
				projectId: req.body.projectId
			}
		}).then((story) => {
			console.log(story)
		})
	})

}