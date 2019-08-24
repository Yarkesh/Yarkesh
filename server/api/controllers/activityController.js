const Activities = require('../models/activities');

module.exports.createActivity = (req, res) => {
	Activities.create({
			activityName: req.body.activityName,
			projectId: req.body.projectId
		})
		.then((activity) => {
			return res.status(200).json({
				activityId: activity.activityId,
				activityName: activity.activityName
			});
		})
		.catch((err) => {
			return res.status(500).json({
				err
			});
		});
};

module.exports.getProjectActivities = (req, res) => {
	Activities.findAll({
			where: {
				projectId: req.body.projectId
			},
			attributes: ['activityId', 'activityName']
		})
		.then((activities) => {
			return res.status(200).json({
				activities
			});
		})
		.catch((err) => {
			return res.status(500).json({
				message: 'Couldn\'t find activities',

			});
		});
};