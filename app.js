require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const parser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('./middlewares/cors');
const routes = require('./routes');
const limiter = require('./middlewares/limiter');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3002, MONGO_URL = 'mongodb://localhost:27017/moviesdb' } = process.env;

const app = express();
mongoose.connect(MONGO_URL);
app.use(express.json());
app.use(parser());
app.use(helmet());
app.use(limiter);
app.use(requestLogger);
app.use(cors);
app.use(routes);
app.use(errors());
app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
