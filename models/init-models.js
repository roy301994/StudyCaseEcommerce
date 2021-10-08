var DataTypes = require("sequelize").DataTypes;
var _cart = require("./cart");

function initModels(sequelize) {
  var cart = _cart(sequelize, DataTypes);


  return {
    cart,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
