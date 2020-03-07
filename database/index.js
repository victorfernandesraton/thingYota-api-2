const Sequelize = require('sequelize');

module.exports = new Sequelize(process.env.DB || "testedb", 'postgres', '123456', {
  host: process.env.DB_HOST,
  dialect: 'postgres'
});
