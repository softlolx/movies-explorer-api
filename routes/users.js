const userRouter = require('express').Router();
const { updateUserInfo, getMyProfile } = require('../controllers/users');
const { validateUserInfo } = require('../utils/validators/userValidation');

userRouter.get('/me', getMyProfile);
userRouter.patch('/me', validateUserInfo, updateUserInfo);

module.exports = userRouter;
