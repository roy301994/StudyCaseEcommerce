const jwt = require('jsonwebtoken');

const validasiToken = async (req, res, next) => {
  var check = false;
  //
  if (req.headers.hasOwnProperty("token")) {
    // check=true
    var TokenUser = req.headers.token;
    // req._custom = {TokenUser}
    // next()



jwt.verify(TokenUser, 'trialJWT',(error,decoded)=>{
        if(error){
            res.status(401).json({
                error: true,
                message: "Unauthorized",
                data: [],
              });
        }else{
            next()
        }
    })
  } else {
    res.status(401).json({
      error: true,
      message: "Token not found",
      data: [],
    });
  }
};

module.exports = validasiToken;