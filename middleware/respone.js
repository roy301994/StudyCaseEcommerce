const responeHandler = async (req, res, next) => {
  try {
    var response={
      error: req._error,
      data: req._data,
      message: req._message,
    }
     if(req._custom){
       response={...response,...req._custom}
     }
    res.status(req._status).json(response);
    next()
  } catch (error) {
    next(error);
  }
};

module.exports = responeHandler;
