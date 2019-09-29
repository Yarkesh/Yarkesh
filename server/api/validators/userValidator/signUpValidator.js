const {
	check
} = require('express-validator');
const Users = require('../../models/users');
const NotConfirmedUsers = require('../../models/notConfirmedUsers');

// Checking if the attributes provided are valid
exports.signUp = [
	// Email validation
	check('email')
	.custom((value) => !/\s/.test(value))
	.withMessage('No spaces are allowed in the email')
	.not()
	.isEmpty()
	.withMessage('email cant be empty')
	.isString()
	.withMessage('email must be string')
	.isEmail()
	.normalizeEmail()
	.withMessage('email is not valid')
	.isLength({
		min: 7,
		max: 50
	})
	.withMessage("email can't be more than 50 characters long")

	//1


	// .custom((email) => {
	// 	return Users.findOne({
	// 		where: {
	// 			email: email
	// 		}
	// 	}).then((res) => {
	// 		if (res) {
	// 			return Promise.reject('Email already in use');
	// 		}
	// 	});
	// })
	// .custom((email) => {
	// 	return NotConfirmedUsers.findOne({
	// 		where: {
	// 			email: email
	// 		}
	// 	}).then((res) => {
	// 		if (res) {
	// 			return Promise.reject('Email already in use');
	// 		}
	// 	});
	// })

	//2


	.custom((email) => {
		return isEmailAvailable(email).then(() => {
				return true;
			})
			.catch(() => {
				return Promise.reject('email already in use')
			})

	}),

	// username validation
	check('userName')
	.custom((value) => !/\s/.test(value))
	// .matches(/\s/)
	.withMessage('No spaces are allowed in the username')
	.not()
	.isEmpty()
	.withMessage('userName cant be empty')
	.trim()
	.escape()
	.isString()
	.withMessage('username must be string')
	.isLength({
		min: 2,
		max: 32
	})
	.withMessage('username must be  between 2 and 32 characters long')

	//1

	// .custom((userName) => {
	// 	return Users.findAll({
	// 		where: {
	// 			userName: userName
	// 		}
	// 	}).then((res) => {
	// 		if (res.length) {
	// 			return Promise.reject('userName already in use');
	// 		}
	// 	});
	// })
	// .custom((userName) => {
	// 	return NotConfirmedUsers.findAll({
	// 		where: {
	// 			userName: userName
	// 		}
	// 	}).then((res) => {
	// 		if (res.length) {
	// 			return Promise.reject('userName already in use');
	// 		}
	// 	});
	// }),


	//2

	.custom((userName) => {
		return isUserNameAvailable(userName).then(() => {
				return true;
			})
			.catch(() => {
				return Promise.reject('userName already in use')
			})

	}),


	// name validation
	check('name')
	.not()
	.isEmpty()
	.withMessage('name cant be empty')
	.isString()
	.withMessage('name must be string')
	.isLength({
		min: 2,
		max: 32
	})
	.withMessage('name must be  between 2 and 32 characters long'),

	// password validation
	check('password')
	.not()
	.isEmpty()
	.withMessage('password cant be empty')
	.isString()
	.withMessage('password must be string')
	.isLength({
		min: 6,
		max: 40
	})
	.withMessage('password must be at least 6 characters long , max 40 chars')
	.matches(/\d/)
	.withMessage('password must contain a number'),
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


isEmailAvailable = (email) => {
	return new Promise((resolve, reject) => {
		Users.findOne({
			where: {
				email: email
			}
		}).then((result) => {
			if (result) {
				reject();
			} else {
				//looking in notconfirmed users for email
				NotConfirmedUsers.findOne({
					where: {
						email: email
					}
				}).then((result) => {
					if (result) {
						reject();
					} else {
						// didn't find a match in either table
						resolve()
					}
				});
			}
		});
	}) //looking in confirmed users for email

}

isUserNameAvailable = (userName) => {
	return new Promise((resolve, reject) => {
		Users.findOne({
			where: {
				userName: userName
			}
		}).then((result) => {
			if (result) {
				reject();
			} else {
				//looking in notconfirmed users for email
				NotConfirmedUsers.findOne({
					where: {
						userName: userName
					}
				}).then((result) => {
					if (result) {
						reject();
					} else {
						// didn't find a match in either table
						resolve()
					}
				});
			}
		});
	}) //looking in confirmed users for email

}