const Projects = require('../models/projects');
const Users = require('../models/users');
const Stories = require('../models/stories');
const Sprints = require('../models/sprints');
const Activities = require('../models/activities');

exports.getProjectStories = (req, res) => {
	// finding projects created by this certain user
	Story.findAll({
			where: {
				projectId: req.body.projectId
			},
			order: [
				["storyPoint", 'DESC']
			],
			include: [{
					model: User,
					attributes: ['name'],
					as: 'creator'
				},
				{
					model: Project,
					attributes: ['title']
				}
			]
		})
		.then(stories => {
			return res.status(200).json({
				stories
			});
		})
		.catch(err => {
			return res.status(500).json({
				message: 'finding story failed',
				err
			});
		});
};
exports.createStory = async (req, res) => {
	var sprintFoundId, activityFoundId

	Sprints.findAll({
		where: {
			projectId: req.body.projectId,
			sprintName: 'Sprint #1'
		}
	}).then((sprintFound) => {
		Activities.findAll({
			where: {
				projectId: req.body.projectId,
				activityName: 'Default Activity'
			}
		}).then((activityFound) => {
			sprintFoundId = sprintFound[0].sprintId
			if (req.body.sprintId != null) {
				foundSprintId = req.body.sprintId
			}
			activityFoundId = activityFound[0].activityId
			if (req.body.activityId != null) {
				activityFoundId = req.body.activityId
			}

			Stories.create({
					storyName: req.body.storyName,
					sprintId: sprintFoundId,
					activityId: activityFoundId,
					as: req.body.as,
					iWant: req.body.iWant,
					soThat: req.body.soThat,
					acceptance: req.body.acceptance,
					creatorId: req.user.userId,
					projectId: req.body.projectId
				})
				.then((story) => {

					return res.status(200).json({
						message: `story created!`,
						story
					});
				})
				.catch(err => {
					return res.status(500).json({
						message: 'story FAILED !',
						err
					});
				});

		})
	})





}

module.exports.getStoryDetials = (req, res) => {
	Stories.findAll({
			where: {
				storyId: req.body.storyId
			}
		})
		.then((storyDetails) => {
			return res.status(200).json({
				storyDetails
			});
		})
		.catch((error) => {
			return res.status(500).json({
				error
			});
		});
};