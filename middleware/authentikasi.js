const jwt = require("jsonwebtoken");

const validasiToken = async (req, res, next) => {
  var check = false;

  // console.log(req.headers);
  if (req.headers.hasOwnProperty("authorization")) {
    // check=true
    var TokenUser = req.headers.authorization;
    var Token = TokenUser.split(" ");
    // req._custom = {TokenUser}
    // next()

    jwt.verify(Token[1], "trialJWT", (error, decoded) => {
      if (error) {
        res.status(401).json({
          error: true,
          message: "Unauthorized",
          data: [],
        });
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({
      error: true,
      message: "Token not found",
      data: [],
    });
  }
};

// const validasiToken2 = (roles) => {
//   return async (req, res, next) => {
//     var check = false;
//     if (req.headers.hasOwnProperty("authorization")) {
//       // check=true
//       var TokenUser = req.headers.authorization;
//       var Token = TokenUser.split(" ");
//       // req._custom = {TokenUser}
//       // next()

//       jwt.verify(Token[1], "trialJWT", (error, decoded) => {
//         if (error) {
//           res.status(401).json({
//             error: true,
//             message: "Unauthorized",
//             data: [],
//           });
//         } else {
//           var rls = decoded.roles;
//           var status = false;
//           for(var i=0;i<roles.length;i++){
//             // status = rls.includes(val);
//             //   if (status) {
//             //     break;
//             //   }
//           }
//           if (status) {
//             next();
//           } else {
//             res.status(401).json({
//               error: true,
//               message: "Unauthorized, kamu tidak memiliki akses ",
//               data: [],
//             });
//           }
//         }
//       });
//     } else {
//       res.status(401).json({
//         error: true,
//         message: "Token not found",
//         data: [],
//       });
//     }
//   };
// };

// console.log(req.headers);

module.exports = validasiToken