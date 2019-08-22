const ProjectMembers = require('../models/projectMembers');
const Projects = require('../models/projects');
const Users = require('../models/users');
const Sprints = require('../models/sprints');
const Activities = require('../models/activities');
const Assignments = require('../models/assignments');
const Dependencies = require('../models/dependencies');
const NotConfirmedUsers = require('../models/notConfirmedUsers');

exports.createUsers = (req, res) => {
    Users.create({
        userName: 'ali',
        email: 'ali@ali.com',
        name: 'ali',
        password: 'mmmm5',
    })
    Users.create({
        userName: 'mamad',
        email: 'mamad@mamad.com',
        name: 'mamad',
        password: 'mmmm5',
    })
    Users.create({
        userName: 'jack',
        email: 'jack@jack.com',
        name: 'jack',
        password: 'mmmm5',
    })
    Users.create({
        userName: 'meti',
        email: 'meti@meti.com',
        name: 'meti',
        password: 'mmmm5',
    })
    Users.create({
        userName: 'alij',
        email: 'alij@alij.com',
        name: 'alij',
        password: 'mmmm5',
    })
}


exports.createProjects = (req, res) => {
    Projects.create({
        creatorId: "1",
        title: "first project by ali",
        description: "some desc"
    })
    Projects.create({
        creatorId: "2",
        title: "first project by mamad",
        description: "some desc"
    })
    Projects.create({
        creatorId: "1",
        title: "second project by ali",
        description: "some desc"
    }).then(() => {
        return res.status(200).json({
            message: "done"
        })
    })

}