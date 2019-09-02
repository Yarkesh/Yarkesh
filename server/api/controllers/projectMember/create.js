
const ProjectMembers = require('../../models/projectMembers');
const Users = require('../../models/users');


exports.addMembers = (req, res, next) => {
    Users.findOne({
        where: {
            email: req.body.email
        }
    }).then((user) => {
        if (user) {
            ProjectMembers.findOne({
                where: {
                    memberId: user.userId,
                    projectId: req.body.projectId
                },
                include: [{
                    model: Users,
                    attributes: ['name', 'email', 'userName', 'userId']
                }]
            })
                .then((member) => {
                    if (member) {
                        return res.status(500).json({
                            error: 'This member is already a part of this project',
                            name: user.name,
                            email: user.email,
                            userName: user.userName,
                            userId: user.userId
                        });
                    } else {
                        ProjectMembers.create({
                            memberId: user.userId,
                            projectId: req.body.projectId
                        })
                            .then((member) => {
                                res.status(200).json({
                                    message: "member added to project",
                                    name: user.name,
                                    email: user.email,
                                    userName: user.userName,
                                    userId: user.userId
                                })


                            })
                            .catch((err) => {
                                return res.status(500).json({
                                    error: 'This user does not exist'
                                });
                            });
                    }
                })
                .catch();
        } else {
            res.status(500).json({
                error: 'This email does not exist'
            })
        }

    })

};