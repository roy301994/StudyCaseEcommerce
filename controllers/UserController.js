const sequelize = require("../config/dbconnection");
const { UsersModel } = require("../models");
const { UserLoginModel } = require("../models");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../config/mailerconfig");

const appkeyModel = require("../models/index.js").appkeyModel;

class UserController {
  register = async (req, res, next) => {
    //yg dikiri obejct di database ,sebelah kanan object inputan dari postman
    const t = await sequelize.transaction();
    try {
      var check = await UsersModel.findOne({
        where: {
          username: req.body.username2,
        },
      });
      if (check) {
        throw ` username is already taken`;
      }

      const users = await UsersModel.create(
        {
          namaLengkap: req.body.namaLengkap2,
          nickname: req.body.nickname2,
          username: req.body.username2,
          email: req.body.email2,
          nomorTelepon: req.body.nomorTelepon2,
          tanggalLahir: req.body.tanggalLahir2,
          status: req.body.typeLogin2 == "manual" ? 0 : 1,
        },
        { transaction: t }
      );

      var salt = bcrypt.genSaltSync(10);
      // hash password dengan salt
      var hash = bcrypt.hashSync(req.body.password2, salt);
      var token = bcrypt.hashSync("TOKEN", salt);

      const userLogin = await UserLoginModel.create(
        {
          password: hash,
          typeLogin: req.body.typeLogin2,
          username: req.body.username2,
          verify_email: req.body.typeLogin2 == "manual" ? 0 : 1,
          verifytoken: token,
        },
        { transaction: t }
      );

      if (userLogin.typeLogin === "manual") {
        sendEmail(
          "studycase2021@gmail.com",
          req.body.email2,
          "Trial Verifikasi Email",
          "http://localhost:8083/verify?token=" + token
        );

        console.log(`"http://localhost:8083/verify?token=${token}`);
      }

      req._data = { users, userLogin };
      req._status = 201;
      req._error = false;
      req._message = "user berhasil di create";

      await t.commit();

      next();
    } catch (error) {
      await t.rollback();
      req._status = 501;
      req._error = true;
      req._message = error;
      next(new Error(error));
    }
  };

  verify = async (req, res, next) => {
    // console.log("token",req.query)
    // res.json({data:[]},200)
    try {
      const token = req.query.token;
      // console.log(req.query)
      var verify = await UserLoginModel.findOne({
        where: {
          verifytoken: token,
        },
      });
      // var a=[1,2,3,4,5,6,7]
      // var ulogin=UserLoginModel.find({where:{verify_email:1}}) ulogin=[roy3]
      // ulogin.map((x)=>{
      //     x.username
      // })

      // verify={"username":"yu4",
      //         "password":"sdads"}
      if (verify) {
        var update = await UsersModel.update(
          {
            status: 1,
          },
          {
            where: {
              username: verify.username, //login dan user login memiliki for and key user name sehingga verify.username
            },
          }
        );

        var update = await UserLoginModel.update(
          {
            verify_email: 1,
          },
          {
            where: {
              verifytoken: token,
            },
          }
        );
        req._status = 200;
        req._error = false;
        req._message = "Email has been verified";
        next();
      } else {
        throw new Error("Email is not valid");
      }
    } catch (error) {
      req._status = 400;
      req._error = true;
      req._message = error;
      next(new Error(error));
    }
  };
}

module.exports = new UserController();

// try {
//     if (req.query.value==1){
//         // var test=t
//         req._custom='testing'
//         req._status=200
//         // req._data='testing'
//         req._error=true
//         next()
//     } else {
//         throw `anda salah masukkan value`
//     }

// } catch (error) {
//     next(new Error(error))
// }
