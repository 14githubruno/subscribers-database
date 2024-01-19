const successLogger = (req, res, next) => {
  const message = `${req.method}\t${req.url}`;
  console.log(message);
  next();
};

module.exports = successLogger;
