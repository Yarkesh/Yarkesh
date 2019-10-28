const { check, validationResult } = require('express-validator');

module.exports.handler = (inputErrors) => {
	const outputErrors = new Object();
	inputErrors.forEach((item) => {
		if (outputErrors[item.param]) {
			outputErrors[item.param].push(item.msg);
		} else {
			outputErrors[item.param] = new Array(item.msg);
		}
	});
	return outputErrors;
};

module.exports.isValid = (req, res, next) => {
	const errorsList = validationResult(req).errors;
	const handledErrorsList = this.handler(errorsList);
	if (Object.keys(handledErrorsList).length > 0) {
		return res.status(422).json({
			errorCode: '1',
			errors: handledErrorsList
		});
	} else {
		return next();
	}
};
