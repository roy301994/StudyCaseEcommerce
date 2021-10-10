const sequelize = require("../config/dbconnection");
const { CartModel,ProductModel, ProductCategoryModel, CategoryModel } = require("../models");

class CartController {
  createCart = async (req, res, next) => {
    try {
      
        var product_id= req.body.product_id
        var user_id=req._user_id

        const verify = await CartModel.findOne({
            where:{
                product_id,
                user_id
            }
        })

        if (verify) {
            const CartKosong= await CartModel.update({
                quantity:verify.quantity+1
            },{
                where:{
                    product_id,
                    user_id
                }
            })



        }else {



      const Cart = await CartModel.create({
        user_id:req._user_id,
        product_id:req.body.product_id,
        quantity:req.body.quantity,
        
      });
    }
    //   const getCart=await CartModel.findAll({
    //     // attributes:[],  
    //     where:{
    //           id:Cart.id
    //         //   user_id:req._user_id,
    //         //   product_id:req.body.product_id
    //       }
    //       ,include:[{
    //           model:ProductModel,
    //           required:true,
    //         //   attributes:[],
    //           as :"product",
    //           include:[{
    //             model:ProductCategoryModel,
    //             required:true,
    //             // attributes:[],
    //             as :"productcategory",
    //             include:[{
    //                 model:CategoryModel,
    //                 required:true,
    //                 as :"categories",
    //                 attributes:["category"]
    //               }]
    //           }]
    //         }]
    // })
    
      req._data = [];
      req._status = 201;
      req._error = false;
      req._message = "Cart berhasil di create";
      next();
    } catch (error) {
      req._status = 501;
      req._error = true;
      req._message = error;
      next(new Error(error));
    }
  };



    UpdateCart= async (req,res,next)=>{


        try {
            // var user_id=req._user_id
            // var product_id=req.body.product_id
            var quantity=req.body.quantity


            var verify =await CartModel.findOne({
                where:{
                    id:req.params.id
                }
            })
            if (verify){
                const Cart=await CartModel.update({
                    // user_id,
                    // product_id,
                    quantity
                },{
                    where:{
                        id:req.params.id
                    }
                })

                req._status = 201;
                req._error = false;
                req._message = "ID cart has been found";
            }else {

            req._status = 501;
            req._error = true;
            req._message = "ID cart not found";
            }
            next()
        } catch (error) {
            req._status = 501;
            req._error = true;
            req._message = error;
            next(new Error(error))
        }

        






    }


    DeleteCart = async (req,res,next)=>{

        try {

            const verify = await CartModel.findOne({
                where:{
                    id:req.params.id
                }
            })
            if (verify){
                await CartModel.destroy({
                    where:{
                        id:req.params.id
                    }
                })
                req._status = 201;
                req._error = false;
                req._message = "data has been deleted";
            }else {
            
            req._status = 501;
            req._error = true;
            req._message = "data not found";
            }
            next()
        } catch (error) {
            req._status = 501;
            req._error = true;
            req._message = error;
            next(new Error(error))
        }
       
    }
    
    
}



  module.exports= new CartController()