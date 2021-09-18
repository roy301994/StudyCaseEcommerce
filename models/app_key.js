const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "app_key",
    {
      app_key: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
      },
      description: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "app_key",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "app_key" }],
        },
      ],
    }
  );
};
