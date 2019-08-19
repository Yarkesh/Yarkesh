const Projects = require('../models/projects');
const Users = require('../models/users');
const Stories = require('../models/stories');

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
exports.createStory = (req, res) => {
	// creating project with foreign key for user
	Stories.create({
			storyName: req.body.storyName,
			sprintId: req.body.sprintId,
			as: req.body.as,
			iWant: req.body.iWant,
			soThat: req.body.soThat,
			acceptance: req.body.acceptance,
			// foreign key to user : creatorId given from the jwt
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