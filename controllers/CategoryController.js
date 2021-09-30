const sequelize = require("../config/dbconnection");
const { CategoryModel } = require("../models");

class CategoryController {
  createCategory = async (req, res, next) => {
    try {
      var category = req.body.category;
      var status = req.body.status;
      var parentID = req.body.parent_id;

      const Category = await CategoryModel.create({
        category: category,
        status: status,
        parent_id: parentID,
      });

      req._data = Category;
      req._status = 201;
      req._error = false;
      req._message = "Category berhasil di create";
      next();
    } catch (error) {
      req._status = 501;
      req._error = true;
      req._message = error;
      next(new Error(error));
    }
  };

  UpdateCategory = async (req, res, next) => {
    try {
      var category = req.body.category;
      var status = req.body.status;
      var parentID = req.body.parent_id;

      var verify = await CategoryModel.findOne({
        where: {
          id: req.params.id,
        },
      });

      if (verify) {
        const Category = await CategoryModel.update(
          {
            category: category,
            status: status,
            parent_id: parentID,
          },
          {
            where: { id: req.params.id },
          }
        );
        // req._data = Category;
        req._status = 201;
        req._error = false;
        req._message = "Category berhasil di update";
      } else {
        req._status = 501;
        req._error = true;
        req._message = "ID Category tidak ditemukan";
      }
      next();
    } catch (error) {
      req._status = 501;
      req._error = true;
      req._message = error;
      next(new Error(error));
    }
  };

  DeleteCategory = async (req, res, next) => {
    try {
      const verify = await CategoryModel.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (verify) {
        await CategoryModel.destroy({
          where: {
            id: req.params.id,
          },
        });
        req._status = 200;
        req._error = false;
        req._message = "Data has been deleted";
      } else {
        req._status = 501;
        req._error = true;
        req._message = "Data not found";
      }
      next();
    } catch (error) {
      req._status = 504;
      req._error = true;
      req._message = error;
      next(new Error(error));
    }
  };

  FindOneCategory = async (req, res, next) => {
    try {
      const check = await CategoryModel.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (check) {
        const category = await CategoryModel.findOne({
          where: {
            id: req.params.id,
          },
        });
        req._data = category;
        req._status = 200;
        req._error = false;
        req._message = "Data has been found";
      } else {
        req._status = 501;
        req._error = true;
        req._message = "Data not found";
      }

      next();
    } catch (error) {
      req._status = 501;
      req._error = true;
      req._message = error;
      next(new Error(error));
    }
  };


    FindAllCategory = async (req,res,next)=>{

      try {
        const category= await CategoryModel.findAll()
        req._data=category
        req._status=200
        req._error=false
        req._message="List all data Category"
        next()
      } catch (error) {
        req._status=501
        req._error=true
        req._message=error
        next(new Error(error))
      }


    }

















}

module.exports = new CategoryController();
