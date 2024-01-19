const errorLogger = (err, req, res, next) => {
  const error = `${err.name}:\t${err.message}\t${req.method}\t${req.url}`;
  console.log(error);
  res.status(res.statusCode).json({ message: err.message });
  next();
};

module.exports = errorLogger;
