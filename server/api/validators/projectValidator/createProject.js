const {
	check
} = require('express-validator');

exports.Validator = [
	check('title')
	.not()
	.isEmpty()
	.withMessage('title cant be empty')
	.isString()
	.withMessage('title must be string')
	.isLength({
		min: 2,
		max: 64
	})
	.withMessage('title must be  between 2 and 64 characters long'),

	check('description')
	// .not()
	// .isEmpty()
	// .withMessage('description cant be empty')
	.isString()
	.withMessage('description must be string')
	.isLength({
		max: 512
	})
	.withMessage('description cant be more than 512 characters long'),

	check('sprintDuration')
	.isNumeric()
	.withMessage('sprintDuration must be a number')
	.not()
	.isEmpty()
	.withMessage('sprintDuration cant be empty')
];