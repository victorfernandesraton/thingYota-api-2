const Sequelize = require('sequelize')
const db = require('../database/index')
const Bukcket = require('./bucket.model')
const Sensor = require('./sensor.model');
module.exports = db.define('sensor', {
  // attributes
  bucket: {
    type:  Sequelize.HasOne(Bukcket),
    allowNull: false
  },
  sensor: {
    type:  Sequelize.HasOne(Sensor),
    allowNull: false
  }
  // lastName: {
  //   type: Sequelize.STRING
  //   // allowNull defaults to true
  // }
});
