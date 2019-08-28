const ProjectMembers = require('../models/projectMembers');
const Projects = require('../models/projects');
const Users = require('../models/users');
const Sprints = require('../models/sprints');
const Activities = require('../models/activities');
const createDependencyController = require('./dependency/create');
const Stories = require('../models/stories');

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


exports.createProjects = (req, res, next) => {
    Projects.create({
        creatorId: '1',
        title: 'first project by ali',
        description: 'some desc'
    })

    Projects.create({
        creatorId: '2',
        title: 'first project by mamad',
        description: 'some desc'
    })

    Projects.create({
        creatorId: '1',
        title: 'second project by ali',
        description: 'some desc'
    })
    next();
};


exports.createMembers = (req, res, next) => {
    ProjectMembers.create({
        memberId: "1",
        projectId: "1"
    });
    ProjectMembers.create({
        memberId: "2",
        projectId: "2"
    });
    ProjectMembers.create({
        memberId: "1",
        projectId: "3"
    });
    ProjectMembers.create({
        memberId: "2",
        projectId: "1"
    });
    ProjectMembers.create({
        memberId: "1",
        projectId: "2"
    });
    ProjectMembers.create({
        memberId: "3",
        projectId: "1"
    });
    ProjectMembers.create({
        memberId: "4",
        projectId: "1"
    });
    ProjectMembers.create({
        memberId: "5",
        projectId: "1"
    });
    ProjectMembers.create({
        memberId: "3",
        projectId: "2"
    });
    next()
}


exports.createSprints = (req, res, next) => {
    Sprints.create({
        projectId: "1",
        sprintName: "Story Pool",
        status: "Open"
    });
    Sprints.create({
        projectId: "2",
        sprintName: "Story Pool",
        status: "Open"
    });
    Sprints.create({
        projectId: "3",
        sprintName: "Story Pool",
        status: "Open"
    });
    Sprints.create({
        projectId: "1",
        sprintName: "Sprint #2",
        status: "Open"
    });
    Sprints.create({
        projectId: "1",
        sprintName: "Sprint #3",
        status: "Open"
    });
    Sprints.create({
        projectId: "2",
        sprintName: "Sprint #2",
        status: "Open"
    });
    next()


}



exports.createActivities = (req, res, next) => {
    Activities.create({
        activityName: 'Default Activity',
        projectId: "1"
    });
    Activities.create({
        activityName: 'Default Activity',
        projectId: "2"
    });
    Activities.create({
        activityName: 'Default Activity',
        projectId: "3"
    });
    Activities.create({
        activityName: 'Activity 2',
        projectId: "1"
    });
    Activities.create({
        activityName: 'Activity 3',
        projectId: "1"
    });
    Activities.create({
        activityName: 'Activity 2',
        projectId: "2"
    });
    next();

}

exports.createStories = (req, res, next) => {
    //1
    Stories.create({
        storyName: "Story1",
        sprintId: "1",
        activityId: "1",
        as: "ali",
        iWant: "kill my self",
        soThat: "people can have peace",
        acceptanceTest: {
            "test": [{
                "text": "test 1",
                "done": "true"
            },
            {
                "text": "test 2",
                "done": "false"
            },
            {
                "text": "test 3",
                "done": "false"
            }
            ]
        },
        status: "ToDo",
        storyPoint: "3",
        priority: "high",
        isEpic: "false",
        creatorId: "1",
        projectId: "1"
    });
    //2
    Stories.create({
        storyName: "Story1",
        sprintId: "2",
        activityId: "2",
        as: "mamad",
        iWant: "kill my self",
        soThat: "people can have peace",
        acceptanceTest: {
            "test": [{
                "text": "test 1",
                "done": "true"
            },
            {
                "text": "test 2",
                "done": "false"
            },
            {
                "text": "test 3",
                "done": "false"
            }
            ]
        },
        status: "ToDo",
        storyPoint: "3",
        priority: "high",
        isEpic: "false",
        creatorId: "2",
        projectId: "2"
    });
    //3
    Stories.create({
        storyName: "Story2",
        sprintId: "1",
        activityId: "1",
        as: "ali",
        iWant: "kill my self2",
        soThat: "people can have peace",
        acceptanceTest: {
            "test": [{
                "text": "test 1",
                "done": "true"
            },
            {
                "text": "test 2",
                "done": "false"
            },
            {
                "text": "test 3",
                "done": "false"
            }
            ]
        },
        status: "ToDo",
        storyPoint: "3",
        priority: "high",
        isEpic: "false",
        creatorId: "1",
        projectId: "1"
    });
    //4
    Stories.create({
        storyName: "Story3",
        sprintId: "1",
        activityId: "1",
        as: "ali",
        iWant: "kill my self3",
        soThat: "people can have peace",
        acceptanceTest: {
            "test": [{
                "text": "test 1",
                "done": "true"
            },
            {
                "text": "test 2",
                "done": "false"
            },
            {
                "text": "test 3",
                "done": "false"
            }
            ]
        },
        status: "ToDo",
        storyPoint: "3",
        priority: "high",
        isEpic: "false",
        creatorId: "1",
        projectId: "1"
    });
    //5
    Stories.create({
        storyName: "Story4",
        sprintId: "1",
        activityId: "1",
        as: "ali",
        iWant: "kill my self4",
        soThat: "people can have peace",
        acceptanceTest: {
            "test": [{
                "text": "test 1",
                "done": "true"
            },
            {
                "text": "test 2",
                "done": "false"
            },
            {
                "text": "test 3",
                "done": "false"
            }
            ]
        },
        status: "ToDo",
        storyPoint: "3",
        priority: "high",
        isEpic: "false",
        creatorId: "1",
        projectId: "1"
    });
    next()

}

exports.createDependency = (req, res, next) => {
    createDependencyController.createDependencyFromList(
        ["4", "3"],
        "5"
    )
    return res.status(200).json({
        message: 'done'
    });

}