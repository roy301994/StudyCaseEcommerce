const jwt = require('jsonwebtoken');

const validasiToken = async (req, res, next) => {
  var check = false;
  

  // console.log(req.headers);
  if (req.headers.hasOwnProperty("authorization")) {
    // check=true
    var TokenUser = req.headers.authorization;
    var Token=TokenUser.split(" ")
    // req._custom = {TokenUser}
    // next()



jwt.verify(Token[1], 'trialJWT',(error,decoded)=>{
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