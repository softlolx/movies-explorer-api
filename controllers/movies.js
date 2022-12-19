const Movie = require('../models/movie');

const BadRequestError = require('../utils/errors/badRequestError');
const ForbiddenError = require('../utils/errors/forbiddenError');
const NotFoundError = require('../utils/errors/notFoundError');

module.exports.getFavoriteMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.addFovoriteMovie = (req, res, next) => {
  Movie.findOne({ movieId: req.body.movieId, owner: req.user._id })
    .then((movie) => {
      if (movie) {
        throw new ForbiddenError('Ой, а вы знаете, такой фильм уже добавлен в избранное.');
      }
      return Movie.create({ ...req.body, owner: req.user._id }).then((newMovie) =>
        res.status(201).send(newMovie)
      );
    })
    .catch((e) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

module.exports.deleteFavoriteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('К несчастью фильма с таким айди мы не нашли');
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Кажется вы пытаетесь удалить чужой фильм? Не надо так');
      }
      return movie.delete().then(() => res.send({ message: 'Все отлично, фильма больше нет' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Что-то пошло не так, как задумано высшими силами'));
      } else {
        next(err);
      }
    });
};
