const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "user_alamat",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      alamat: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      provinsi: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      kota: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      kecamatan: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      kodepos: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      tableName: "user_alamat",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};
