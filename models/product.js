const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nama: {
      type: DataTypes.STRING(150),
      allowNull: false,
      defaultValue: "0"
    },
    harga: {
      type: DataTypes.STRING(150),
      allowNull: false,
      defaultValue: "0"
    },
    deskripsi: {
      type: DataTypes.STRING(250),
      allowNull: false,
      defaultValue: "0"
    },
    stock: {
      type: DataTypes.STRING(250),
      allowNull: false,
      defaultValue: "0"
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'product',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
