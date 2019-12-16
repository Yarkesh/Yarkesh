const ProjectMembers = require('../../models/projectMembers');
const Users = require('../../models/users');
const Project = require('../../models/projects');
const mailController = require('../../controllers/mailController');
const invitedEmails = require('../../models/invitedEmails');

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
                        attributes: ['name', 'email', 'userName', 'userId', 'avatar']
                    }]
                })
                .then((member) => {
                    if (member) {
                        return res.status(500).json({
                            error: 'This member is already a part of this project',
                            name: user.name,
                            email: user.email,
                            userName: user.userName,
                            userId: user.userId,
                            avatar: user.avatar
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
                                    userId: user.userId,
                                    avatar: user.avatar
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


module.exports.inviteMember = (req, res) => {
    Users.findOne({
        where: {
            userId: req.user.userId
        }
    }).then((user) => {
        Project.findOne({
            where: {
                projectId: req.body.projectId
            }
        }).then((project) => {
            mailController.inviteEmail(req.body.email, user, project, req.body.message)

            invitedEmails.create({
                inviterId: req.user.userId,
                projectId: req.body.projectId,
                email: req.body.email,
                message: req.body.message
            }).then((invitedEmail) => {
                return res.status(200).json({
                    invitedEmail,
                    message: 'done'
                })
            })

        })
    })


}