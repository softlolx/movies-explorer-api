const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../utils/errors/notFoundError');
const { validateLoginData, validateRegisterData } = require('../utils/validators//userValidation');

router.post('/signin', validateLoginData, login);
router.post('/signup', validateRegisterData, createUser);
router.get('/signout', (_, res) => {
  res.clearCookie('token').send({ message: 'Вы вышли разлогинились' });
});

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use(() => {
  throw new NotFoundError('Кажется вы не туда попали. Здесь ничего нет');
});

module.exports = router;
