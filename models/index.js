const sequelize = require("../config/dbconnection");
const Sequelize = require("sequelize");
var DataTypes = Sequelize.DataTypes;

const UsersModel = require("./users")(sequelize, DataTypes);
const UserRolesModel = require("./user_roles")(sequelize, DataTypes);
const UserLoginModel = require("./user_logins")(sequelize, DataTypes);
const UserAlamatModel = require("./user_alamat")(sequelize, DataTypes);
const RolesModel = require("./roles")(sequelize, DataTypes);
const appkeyModel = require("./app_key")(sequelize, DataTypes);

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
});

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
};
