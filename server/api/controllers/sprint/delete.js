const Sprint = require('../../models/sprints');


module.exports.deleteSprint = (req, res) => {
    Sprint.destroy({
            where: {
                sprintId: req.body.sprintId
            }
        })
        .then((done) => {
            if (done == 1) {
                return res.status(200).json({
                    message: 'Sprint Deleted'
                });
            } else {
                return res.status(500).json({
                    error: 'couldnt delete sprint',
                    errorCode: '360'
                });
            }
        })
        .catch(() => {
            return res.status(500).json({
                error: 'couldnt delete sprint',
                errorCode: '361'
            });
        });
};