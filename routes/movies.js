const movieRouter = require('express').Router();

const {
  getFavoriteMovies, //
  addFovoriteMovie,
  deleteFavoriteMovie,
} = require('../controllers/movies');

const { validateMovieId, validateMovieData } = require('../utils/validators/movieValidation');

movieRouter.get('/', getFavoriteMovies);
movieRouter.post('/', validateMovieData, addFovoriteMovie);
movieRouter.delete('/:movieId', validateMovieId, deleteFavoriteMovie);

module.exports = movieRouter;
