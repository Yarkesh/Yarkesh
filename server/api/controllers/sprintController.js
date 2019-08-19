const Sprint = require('../models/sprints');
const Story = require('../models/stories');
const Project = require('../models/projects');

module.exports.createSprint = (req, res) => {
	Sprint.create({
		projectId: req.body.projectId,
		sprintName: req.body.sprintName,
		status: req.body.status,
		duration: req.body.duration,
		dueDate: req.body.dueDate
	})
		.then(() => {
			return res.status(200).json({
				message: 'sprint created'
			});
		})
		.catch((err) => {
			return res.status(500).json({
				err
			});
		});
};

module.exports.getSprintStories = (req, res) => {
	Sprint.findAll({
		where: {
			sprintId: req.body.sprintId
		},
		include: [
			{
				model: Story,
				attributes: ['storyName'],
				as: 'stories'
			}
		]
	})
		.then((sprints) => {
			return res.status(200).json({
				sprints
			});
		})
		.catch((err) => {
			return res.status(500).json({
				message: 'lskdfjlksadf',
				err
			});
		});
};