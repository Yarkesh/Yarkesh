const Dependency = require('../../models/dependencies');

module.exports.getStoryDependencies = (req, res) => {
    Dependency.findAll({
        where: {
            storyId: req.body.storyId
        }
    })
        .then((depends) => {
            return res.status(200).json({
                depends
            });
        })
        .catch((error) => {
            return res.status(500).json({
                error
            });
        });
};