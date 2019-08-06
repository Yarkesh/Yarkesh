const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const sequelize = require('./api/models/database-connection');
require('./config/passportJWTConfig')(passport);
const User = require('./api/models/user');
const Project = require('./api/models/project');
const ProjectMembers = require('./api/models/projectMembers')
const Story = require('./api/models/story');

// const router = require('./routes');

const userRouter = require('./api/routes/userRoutes');
const projectRouter = require('./api/routes/projectRoutes');
const projectMembersRouter = require('./api/routes/projectMemberRoutes');
const storyRouter = require('./api/routes/storyRoutes');

//! --------------------------- MIDDLEWARES ---------------------------------------
app.use(passport.initialize());
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());
app.use(cors());

//? ---------------------- ROUTES ------------------------------

app.use('/user', userRouter)
app.use('/project', projectRouter)
app.use('/projectMembers', projectMembersRouter)
app.use('/story', storyRouter)

//! ----------------------------------Database Sync--------------------------------
Project.belongsTo(User, {
    foreignKey: 'creatorId',
    targetKey: 'userId',
    as: 'creator'
});

ProjectMembers.belongsTo(Project, {
    foreignKey: 'projectId',
    targetKey: 'projectId'
});
ProjectMembers.belongsTo(User, {
    foreignKey: 'memberId',
    targetKey: 'userId'
});

Story.belongsTo(Project, {
    foreignKey: 'projectId',
    targetKey: 'projectId'
})

Story.belongsTo(User, {
    foreignKey: 'creatorId',
    targetKey: 'userId',
    as: 'creator'
})

sequelize.sync();
module.exports = app;