const ProjectMembers = require('../../models/projectMembers');
const Users = require('../../models/users');

exports.getProjectMembers = (req, res) => {
    ProjectMembers.findAll({
        where: {
            projectId: req.body.projectId
        },
        attributes: [],
        include: [{
            model: Users,
            attributes: ['name', 'email', 'userName', 'userId', 'avatar']
        }]
    }).then((members) => {
        return res.status(200).json({
            members
        });
    });
};