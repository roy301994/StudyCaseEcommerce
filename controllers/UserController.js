
const sequelize = require('../config/dbconnection')
const {UsersModel}=require('../models')
const {UserLoginModel}=require('../models')
const bcrypt = require('bcrypt');



const appkeyModel=require ('../models/index.js').appkeyModel


class UserController {

    

     register=async(req,res,next)=> {
         //yg dikiri obejct di database ,sebelah kanan object inputan dari postman           
         
         
         
         const t = await sequelize.transaction();
         try {

            var check = await UsersModel.findOne({
                where : {
                    username:req.body.username2
                }
            })
            if (check){
                throw ` username is already taken`
            }

            const users= await UsersModel.create({
                namaLengkap : req.body.namaLengkap2,
                nickname : req.body.nickname2,
                username:req.body.username2,
                email:req.body.email2,
                nomorTelepon:req.body.nomorTelepon2,
                tanggalLahir:req.body.tanggalLahir2,
                status:0
            }, { transaction: t })

            var salt = bcrypt.genSaltSync(10);
            // hash password dengan salt 
            var hash = bcrypt.hashSync(req.body.password2, salt); 
               

            const userLogin= await UserLoginModel.create({
                password:hash,
                typeLogin:req.body.typeLogin2,
                username:req.body.username2,
                verify_email:0
            }, { transaction: t })

            req._data={users,userLogin}
            req._status=201
            req._error=false
            req._message='user berhasil di create'
            

            await t.commit();

            

            next()
        } catch (error) {
            await t.rollback()
            req._status=501
            req._error=true
            req._message=error
            next(new Error(error))
        }
     
       
    }



      



    





}

module.exports=new UserController()






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