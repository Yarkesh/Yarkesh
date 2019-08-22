const ProjectMembers = require('../models/projectMembers');
const Projects = require('../models/projects');
const Users = require('../models/users');
const Sprints = require('../models/sprints');
const Activities = require('../models/activities');
const Assignments = require('../models/assignments');
const Dependencies = require('../models/dependencies');
const NotConfirmedUsers = require('../models/notConfirmedUsers');

exports.createUsers = (req, res, next) => {
    Users.create({
        userName: 'ali',
        email: 'ali@ali.com',
        name: 'ali',
        password: '$2b$10$kMvKfmtilo4KbZqzIHPg8uBB33jZlj1Bpt9Eid.u7R2FprQ4BRIje'
    });
    Users.create({
        userName: 'mamad',
        email: 'mamad@mamad.com',
        name: 'mamad',
        password: '$2b$10$kMvKfmtilo4KbZqzIHPg8uBB33jZlj1Bpt9Eid.u7R2FprQ4BRIje'
    });
    Users.create({
        userName: 'jack',
        email: 'jack@jack.com',
        name: 'jack',
        password: '$2b$10$kMvKfmtilo4KbZqzIHPg8uBB33jZlj1Bpt9Eid.u7R2FprQ4BRIje'
    });
    Users.create({
        userName: 'meti',
        email: 'meti@meti.com',
        name: 'meti',
        password: '$2b$10$kMvKfmtilo4KbZqzIHPg8uBB33jZlj1Bpt9Eid.u7R2FprQ4BRIje'
    });
    Users.create({
        userName: 'alij',
        email: 'alij@alij.com',
        name: 'alij',
        password: '$2b$10$kMvKfmtilo4KbZqzIHPg8uBB33jZlj1Bpt9Eid.u7R2FprQ4BRIje'
    })
    next()
};

exports.createProjects = (req, res) => {
    Projects.create({
        creatorId: '1',
        title: 'first project by ali',
        description: 'some desc'
    });
    Projects.create({
        creatorId: '2',
        title: 'first project by mamad',
        description: 'some desc'
    });
    Projects.create({
        creatorId: '1',
        title: 'second project by ali',
        description: 'some desc'
    }).then(() => {
        return res.status(200).json({
            message: 'done'
        });
    });
};