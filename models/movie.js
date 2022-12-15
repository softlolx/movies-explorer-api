const { mongoose } = require('mongoose');
const validator = require('validate');

const urlValidator = {
  validator: (data) =>
    validator.isURL(data, {
      protocols: ['http', 'https'],
      require_tld: true,
      require_protocol: true,
    }),
  message: 'К сожалению, вы ввели некорректный адрес и все пошло не по плану. Нам очень жаль',
};

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  desciption: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    validate: urlValidator,
    required: true,
  },
  trailerLink: {
    type: String,
    validate: urlValidator,
    required: true,
  },
  thumbnail: {
    type: String,
    validate: urlValidator,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
