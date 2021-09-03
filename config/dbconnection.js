const { Sequelize } = require('sequelize');

// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize(process.env.db_name, process.env.db_username, process.env.db_password, {
  host: process.env.db_host,
  dialect: 'mysql'/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});





module.exports=sequelize