const Activities = require('../models/activities');

module.exports.createActivity = (req, res) => {
	Activities.create({
		activityName: req.body.activityName,
		projectId: req.body.projectId
	})
		.then(() => {
			return res.status(200).json({
				message: 'activity created'
			});
		})
		.catch((err) => {
			return res.status(500).json({
				err
			});
		});
};
