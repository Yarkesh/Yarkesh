const router = require('express').Router();

const userRouter = require('./userRoutes');
const projectRouter = require('./projectRoutes');
const projectMembersRouter = require('./projectMemberRoutes');
const storyRouter = require('./storyRoutes');

router.use('/user', userRouter);
router.use('/project', projectRouter);
router.use('/projectMembers', projectMembersRouter);
router.use('/story', storyRouter);

module.exports = router;
