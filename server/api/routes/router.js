const router = require('express').Router();

const userRouter = require('./userRoutes');
const projectRouter = require('./projectRoutes');
const projectMembersRouter = require('./projectMemberRoutes');
const storyRouter = require('./storyRoutes');
const mail = require('../controllers/mailController');

router.use('/user', userRouter);
router.use('/project', projectRouter);
router.use('/projectMembers', projectMembersRouter);
router.use('/story', storyRouter);
router.get('/mail', mail.sendMail);

module.exports = router;
