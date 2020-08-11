const Activities = require('../../models/activities');

module.exports.deleteActivity = async (req, res) => {

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
            Activities.delete({
                where: {
                    projectId: req.body.projectId,
                    activityId: req.body.activityId
                }
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