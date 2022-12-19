require('dotenv').config();

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports.getJWT = function () {
  return NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret-key';
};
