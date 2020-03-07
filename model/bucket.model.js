const Sequelize = require('sequelize')
const db = require('../database/index')

module.exports = db.define('sensor', {
  // attributes
  st_name: {
    type: Sequelize.STRING,
    allowNull: false
  },

  type: {
    type: Sequelize.STRING,
    allowNull: false,

  }
});
