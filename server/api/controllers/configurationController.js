const Configuration = require('../models/configuration');

module.exports.getConfiguration = (req, res) => {
    Configuration.findOne({
        where: {
            key: 'config'
        }
    }).then(config => {
        res.status(200).json({
            configuration: config.value
        })
    }).catch(err => {
        return res.status(500).json({
            configuration: []
        })
    })


}