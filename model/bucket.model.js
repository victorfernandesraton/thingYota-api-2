const Sequelize = require('sequelize')
const db = require('../database/index')

module.exports = db.define('bucket', {
  // attributes
  st_name: {
    type: Sequelize.STRING,
    allowNull: false
  },

  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
});
