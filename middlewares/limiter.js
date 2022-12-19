const limiter = require('express-rate-limit');

module.exports = limiter({
  windowMs: 10 * 60 * 1000,
  max: 100,
});
