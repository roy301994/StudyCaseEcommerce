var DataTypes = require("sequelize").DataTypes;
var _app_key = require("./app_key");

function initModels(sequelize) {
  var app_key = _app_key(sequelize, DataTypes);


  return {
    app_key,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
