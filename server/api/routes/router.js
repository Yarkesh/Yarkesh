const router = require('express').Router();

const createData = require('./createData')
const userRouter = require('./userRoutes');
const projectRouter = require('./projectRoutes');
const projectMembersRouter = require('./projectMemberRoutes');
const storyRouter = require('./storyRoutes');
const sprintRouter = require('./sprintRouter');
const activityRouter = require('./activityRouter');
const dependencyRouter = require('./dependencyRouter');
const assignmentRouter = require('./assignmentRouter');
const milestoneRouter = require('./milestoneRouter');

router.use('/createdata', createData);
router.use('/user', userRouter);
router.use('/project', projectRouter);
router.use('/projectMembers', projectMembersRouter);
router.use('/story', storyRouter);
router.use('/sprint', sprintRouter);
router.use('/activity', activityRouter);
router.use('/dependency', dependencyRouter);
router.use('/assignment', assignmentRouter);
router.use('/milestone', milestoneRouter);

module.exports = router;