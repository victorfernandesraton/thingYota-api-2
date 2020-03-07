const Sequelize = require('sequelize')
const db = require('../database/index')

module.exports = db.define('user', {
  // attributes
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },

  userName: {
    type: Sequelize.STRING,
    allowNull: false,

  },

  lastName: {
    type: Sequelize.STRING
    // allowNull defaults to true
  }
});
