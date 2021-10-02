const sequelize = require("../config/dbconnection");
const { CategoryModel, ProductModel, ProductCategoryModel } = require("../models");



class ProductController{

    createProduct= async (req,res,next)=>{
        // const t = await sequelize.transaction();
        try {
            
            const createproduct=await ProductModel.create({
                nama:req.body.nama,
                harga:req.body.harga,
                deskripsi:req.body.deskripsi,
                stock:req.body.stock,
                user_id:req._user_id
            })//kalau looping pake const error,nilainya harus tetep tdk bisa diubah
            Promise.all(req.body.categories.map(async(value)=>{
                var productCategory=await ProductCategoryModel.create({
                    category:value,
                    id_product:createproduct.id
                })
            }))
            req._data=createproduct
            req._status=201
            req._error=false
            req._message='product berhasil di create'




            
            next()
        } catch (error) {
          
            // return res.status(500).json({
            //     error:error.stack
            // })
            req._status=501
            req._error=true
            req._message=error
            next(new Error(error))
        }
    }






}
module.exports= new ProductController()