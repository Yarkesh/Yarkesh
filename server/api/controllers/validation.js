const { check } = require('express-validator');
const User = require('../models/user');

// Checking if the attributes provided are valid
exports.signUp = [
	// Email validation
	check('email')
		.isEmail()
		.normalizeEmail()
		.withMessage('email is not valid')
		.isLength({ max: 50 })
		.withMessage("email can't be more than 50 characters long")
		.custom((email) => {
			return User.findAll({
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
			return User.findAll({
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
	check(
		'confirmPassword',
		'passwordConfirmation field must have the same value as the password field'
	)
		.exists()
		.custom((value, { req }) => {
			value === req.body.password;
		})
];
