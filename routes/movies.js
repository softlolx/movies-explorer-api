const movieRouter = require('express').Router();

const {
  getFavoriteMovies, //
  createMovie,
  deleteMovie,
} = require('../controllers/cards');

const { validateMovieId, validateMovieData } = require('../utils/validators/movieValidation');

movieRouter.get('/', getFavoriteMovies);
movieRouter.post('/', validateMovieData, addFovoriteMovie);
movieRouter.delete('/:cardId', validateMovieId, deleteFavoriteMovie);

module.exports = movieRouter;
