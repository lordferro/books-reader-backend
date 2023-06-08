const handleMongooseError = (error, data, next) => {
  // eslint-disable-next-line no-param-reassign
  error.status = 400;
  next();
};

module.exports = handleMongooseError;
