const Activities = require('../../models/activities');


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