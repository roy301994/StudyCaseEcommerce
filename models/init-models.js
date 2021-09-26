var DataTypes = require("sequelize").DataTypes;
var _category = require("./category");

function initModels(sequelize) {
  var category = _category(sequelize, DataTypes);


  return {
    category,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
