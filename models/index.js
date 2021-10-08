const sequelize = require("../config/dbconnection");
const Sequelize = require("sequelize");
const product_category = require("./product_category");
var DataTypes = Sequelize.DataTypes;
const CategoryModel=require ("./category")(sequelize, DataTypes);//parameter wajib declarasi model baru
const UsersModel = require("./users")(sequelize, DataTypes);
const UserRolesModel = require("./user_roles")(sequelize, DataTypes);
const UserLoginModel = require("./user_logins")(sequelize, DataTypes);
const UserAlamatModel = require("./user_alamat")(sequelize, DataTypes);
const RolesModel = require("./roles")(sequelize, DataTypes);
const appkeyModel = require("./app_key")(sequelize, DataTypes);
const ProductModel=require("./product")(sequelize, DataTypes);
const ProductCategoryModel=require("./product_category")(sequelize, DataTypes);
const ProductPhotoModel=require("./product_photo")(sequelize, DataTypes);
const CartModel=require("./cart")(sequelize, DataTypes);

// 1 user bisa memiliki lebih dari 1 alamat
UsersModel.hasMany(UserAlamatModel, {
  foreignKey: "user_id",
  targetKey: "id",
});

// 1 user bisa memiliki lebih dari 1 metode login
UsersModel.hasMany(UserLoginModel, {
  foreignKey: "username",
  targetKey: "username",
});

// 1 user bisa memiliki lebih dari 1 role
UsersModel.hasMany(UserRolesModel, {
  foreignKey: "user_id",
  targetKey: "id",
});

//
UserLoginModel.belongsTo(UsersModel, {
  foreignKey: "username",
  targetKey: "username",
  as: 'user'
});

CartModel.belongsTo(ProductModel,{
  foreignKey:"product_id",
  targetKey:"id",
  as:'product'
})

ProductModel.hasMany(ProductCategoryModel,{
  foreignKey:"id_product",
  targetKey:"id",
  as:'productcategory'
})

ProductCategoryModel.belongsTo(CategoryModel,{
  foreignKey:"category",
  targetKey:"id",
  as:'categories'
})
// UserRolesModel.belongsTo(RolesModel,{
//     foreignKey: 'id',
//     targetKey: 'role_id'

// })

module.exports = {
  UsersModel,
  UserRolesModel,
  UserLoginModel,
  UserAlamatModel,
  RolesModel,
  appkeyModel,
  CategoryModel,
  ProductModel,
  ProductCategoryModel,
  ProductPhotoModel,
  CartModel
};
