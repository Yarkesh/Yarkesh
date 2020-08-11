const Activities = require('../../models/activities');

module.exports.editActivity = async (req, res) => {

    try {
        activity = await Activities.findOne({
            where: {
                projectId: req.body.projectId,
                activityId: req.body.activityId
            }
        })
    } catch (error) {
        return res.status(500).json({
            error: "activity not found"
        })
    }

    if (activity) {
        try {
            Activities.update({
                    activityName: req.body.activityName
                },

                {
                    where: {
                        projectId: req.body.projectId,
                        activityId: req.body.activityId
                    }
                }).then((updated) => {
                return res.status(200).json({
                    message: "activity updated"
                })
            })
        } catch (error) {
            return res.status(500).json({
                error: "cant delete activity"
            })
        }
    } else {
        return res.status(500).json({
            error: "activity not found"
        })
    }


}