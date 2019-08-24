const Stories = require('../models/stories');
const Sprints = require('../models/sprints');
const Activities = require('../models/activities');
const Dependency = require('../models/dependencies');
const DependencyController = require('./dependencyController');

exports.getProjectStories = (req, res) => {
	// finding projects created by this certain user
	Stories.findAll({
			where: {
				projectId: req.body.projectId
			},
			attributes: ['storyId', 'storyName']
		})
		.then((stories) => {
			return res.status(200).json({
				stories
			});
		})
		.catch((err) => {
			return res.status(500).json({
				message: 'finding story failed',
				err
			});
		});
};
exports.createStory = async (req, res) => {
	var sprintFoundId, activityFoundId;

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
			sprintFoundId = sprintFound[0].sprintId;
			if (req.body.sprintId != null) {
				foundSprintId = req.body.sprintId;
			}
			activityFoundId = activityFound[0].activityId;
			if (req.body.activityId != null) {
				activityFoundId = req.body.activityId;
			}
			// TODO sheet
			Stories.create({
					storyName: req.body.storyName,
					sprintId: sprintFoundId,
					activityId: activityFoundId,
					as: req.body.as,
					iWant: req.body.iWant,
					soThat: req.body.soThat,
					acceptanceTest: req.body.acceptanceTest,
					status: "ToDo",
					storyPoint: req.body.storyPoint,
					priority: req.body.priority,
					isEpic: req.body.isEpic,
					creatorId: req.user.userId,
					projectId: req.body.projectId
				})
				.then((story) => {
					DependencyController.createDependencyFromList(
						req.body.dependency,
						story.storyId
					);
					return res.status(200).json({
						story
					});
				})
				.catch((err) => {
					return res.status(500).json({
						message: 'story FAILED !',
						err
					});
				});
		});
	});
};

module.exports.getStoryDetials = (req, res) => {
	Stories.findAll({
			where: {
				storyId: req.body.storyId
			},
			include: [{
				model: Dependency,
				attributes: ['dependsOn']
			}]
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