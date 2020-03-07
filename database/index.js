const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB || "testedb", 'postgres', '123456', {
  host: process.env.DB_HOST,
  dialect: 'postgres'
})

module.exports = sequelize;
