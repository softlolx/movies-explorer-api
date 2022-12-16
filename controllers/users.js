const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const BadRequestError = require('../utils/errors/badRequestError');
const UsedEmailError = require('../utils/errors/usedEmailError');
const { getJWT } = require('../utils/utils');

const createTokenById = (id) => {
  const secretKey = getJWT();
  return jwt.sign({ _id: id }, secretKey, { expiresIn: '7d' });
};

const sendCookie = (res, user) => {
  const token = createTokenById(user._id);
  return res
    .cookie('token', token, {
      maxAge: 604800000,
      httpOnly: true,
      sameSite: true,
    })
    .send(user);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUser(email, password)
    .then((user) => {
      sendCookie(res, user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

module.exports.getMyProfile = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.createUser = async (req, res, next) => {
  const {
    email, //
    password,
    name,
  } = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      email, //
      password: passwordHash,
      name,
    });
    res.status(201).send(user);
  } catch (err) {
    if (err.code === 11000) {
      next(new UsedEmailError('Пользователь с данным email уже существует'));
    } else if (err.name === 'ValidationError') {
      next(new BadRequestError(err.message));
    } else {
      next(err);
    }
  }
};

module.exports.updateUserInfo = async (req, res, next) => {
  const { name, email } = req.body;
  const owner = req.user._id;
  try {
    const double = await User.findOne({ email });
    if (double) {
      throw new UsedEmailError('Вы используете чужой почтовый ящик');
    }
    const data = await User.findByIdAndUpdate(
      owner,
      { name, email },
      {
        new: true,
        runValidators: true,
      }
    );
    res.send(data);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(err.message));
    } else {
      next(err);
    }
  }
};
