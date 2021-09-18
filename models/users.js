const sequelize = require("../config/dbconnection");
const Sequelize = require("sequelize");
var DataTypes = Sequelize.DataTypes;
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "users",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      namaLengkap: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      nickname: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      username: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      nomorTelepon: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      tanggalLahir: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      status: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      photo: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "users",
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
