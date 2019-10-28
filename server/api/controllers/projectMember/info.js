const ProjectMembers = require('../../models/projectMembers');
const Users = require('../../models/users');

exports.getProjectMembers = (req, res) => {
    // TODO fix this shit
    ProjectMembers.findAll({
        where: {
            projectId: req.body.projectId
        },
        attributes: [],
        include: [{
            model: Users,
            attributes: ['name', 'email', 'nickName', 'userId', 'avatar']
        }]
    }).then((members) => {
        return res.status(200).json({
            members
        });
    });
};