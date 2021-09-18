const responeHandler = async (req, res, next) => {
  try {
    res.status(req._status).json({
      error: req._error,
      data: req._data,
      custom: req._custom,
      message: req._message,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = responeHandler;
