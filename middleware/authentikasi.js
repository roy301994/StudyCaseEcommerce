const jwt = require("jsonwebtoken");
//validasi token dan validasi role
function inArray(needle, haystack) {
  var length = haystack.length;
  for(var i = 0; i < length; i++) {
      var a=haystack[i]
      if(a.role_id == needle) return true;
  }
  return false;
}
module.exports=function(roles){
  return function(req,res,next){
    var check = false;  
    if (req.headers.hasOwnProperty("authorization")) {
      // check=true
      var TokenUser = req.headers.authorization;
      var Token = TokenUser.split(" ");
      // req._custom = {TokenUser}
      // next()
  
      jwt.verify(Token[1], "trialJWT", (error, decoded) => {
        if (error) {
          return res.status(401).json({
            error: true,
            message: "Unauthorized",
            data: [],
          });
        } else {
          var rls = decoded.roles;
          var status = false
          for(var i=0;i<roles.length;i++){
            status =inArray(roles[i],rls)//roles i yg ada di user route ,rls yg ada ditoken
            console.log("STATUS : ",status,roles[i],rls)
              if (status==true) {
                break;
              }
          }
          if (status) {
            req._user_id=decoded.user_id
            next();
          } else {
            return res.status(401).json({
              error: true,
              message: "Unauthorized, kamu tidak memiliki akses ",
              data: [],
            });
          }
          // next();
        }
      });
    } else {
      return res.status(401).json({
        error: true,
        message: "Token not found",
        data: [],
      });
    }

    // next()
  }
}


//validasi token tanpa validasi role


// const validasiToken = async (req, res, next) => {
//   var check = false;

//   // console.log(req.headers);
//   if (req.headers.hasOwnProperty("authorization")) {
//     // check=true
//     var TokenUser = req.headers.authorization;
//     var Token = TokenUser.split(" ");
//     // req._custom = {TokenUser}
//     // next()

//     jwt.verify(Token[1], "trialJWT", (error, decoded) => {
//       if (error) {
//         res.status(401).json({
//           error: true,
//           message: "Unauthorized",
//           data: [],
//         });
//       } else {
//         next();
//       }
//     });
//   } else {
//     res.status(401).json({
//       error: true,
//       message: "Token not found",
//       data: [],
//     });
//   }
// };

